/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PopupComponent from '../components/PopupComponent';

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [requestData, setRequestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showProblemPopup, setShowProblemPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState('');
  const [selectedDetailId, setSelectedDetailId] = useState('');

  const [problems, setProblems] = useState<{ problem: string; id: number }[]>([]);
  const [details, setDetails] = useState<{ id: number; description: string }[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false); // Додаємо стан для завантаження деталей

  // Переносимо функцію fetchRequestData за межі useEffect
  const fetchRequestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/api/requests/${id}`
      );
      setRequestData(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Помилка при завантаженні даних ${error}`);
        setLoading(false);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, [id]);

  const toggleProblemPopup = () => {
    setSelectedProblemId('');
    setShowProblemPopup(!showProblemPopup);
  };

  const toggleDetailPopup = (problemId: string) => {
    setSelectedProblemId(problemId);
    setSelectedDetailId(''); // Очищуємо вибір деталі
    setShowDetailPopup(true); // Відкриваємо попап одразу

    // Завантажуємо деталі асинхронно, після відкриття попапа
    setLoadingDetails(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_HOST}/api/details?problem=${problemId}`)
      .then((response) => {
        setDetails(response.data.details);
      })
      .catch((error) => {
        console.error('Помилка завантаження деталей:', error);
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  };

  const handleProblemChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProblemId(e.target.value);
  };

  const handleDetailChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDetailId(e.target.value);
  };

  const handleProblemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_HOST}/api/problems/${id}/${selectedProblemId}`
      );
      await fetchRequestData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Помилка при додаванні проблеми');
      } else {
        console.error(error);
      }
    }

    toggleProblemPopup(); // Закриваємо попап після додавання проблеми
  };

  const handleDetailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/api/details/${id}/${selectedProblemId}/${selectedDetailId}`);
      await fetchRequestData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Помилка при додаванні деталі');
      } else {
        console.error(error);
      }
    }

    setShowDetailPopup(false); // Закриваємо попап після додавання деталі
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/problems`
        );
        setProblems(response.data.problems[0].problems);
      } catch (error) {
        console.error('Помилка завантаження проблем:', error);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Деталі заявки #{id}</h1>
      {requestData ? (
        <div>
          <p>
            <strong>Тип:</strong> {requestData.type.name}
          </p>
          <p>
            <strong>Бренд:</strong> {requestData.brand.name}
          </p>
          <p>
            <strong>Модель:</strong> {requestData.model.name}
          </p>

          {/* Відображаємо проблеми, якщо вони є */}
          {requestData.problems && requestData.problems.length > 0 ? (
            <div>
              <h2>Проблеми:</h2>
              <ul>
                {requestData.problems.map((problem: any) => (
                  <li key={problem.id}>
                    <p>
                      <strong>Проблема:</strong> {problem.description}
                    </p>

                    {/* Відображення деталей, якщо вони є */}
                    {problem.details && problem.details.length > 0 ? (
                      <ul>
                        {problem.details.map((detail: any) => (
                          <li key={detail.id}>
                            <p>
                              <strong>Деталь:</strong> {detail.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Деталей не знайдено.</p>
                    )}
                    {/* Кнопка для додавання нової деталі */}
                    <button onClick={() => toggleDetailPopup(problem.id)} className='popup-optional'>
                      Додати деталь
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Проблем не знайдено.</p>
          )}

          <button onClick={toggleProblemPopup} className='popup-main'>
            Додати проблему
          </button>
          <button className="btn btn-search">
            Пошук рішень
          </button>
        </div>
      ) : (
        <p>Дані не знайдено</p>
      )}

      {showProblemPopup && (
        <PopupComponent
          title='Виберіть проблему'
          fields={[
            {
              name: 'Проблема',
              value: selectedProblemId,
              onChange: handleProblemChange,
              type: 'select',
              options: [
                { value: '', label: 'Виберіть проблему' },
                ...problems.map((problem) => ({
                  value: problem.id.toString(),
                  label: problem.problem,
                })),
              ],
            },
          ]}
          onSubmit={handleProblemSubmit}
          onClose={toggleProblemPopup}
        />
      )}

      {showDetailPopup && (
        <PopupComponent
          title='Додати деталь'
          fields={[
            {
              name: 'Деталь',
              value: selectedDetailId,
              onChange: handleDetailChange,
              type: 'select',
              options: loadingDetails
                ? [{ value: '', label: 'Завантаження...' }]
                : [
                    { value: '', label: 'Виберіть деталь' },
                    ...details.map((detail) => ({
                      value: detail.id.toString(),
                      label: detail.description,
                    })),
                  ],
            },
          ]}
          onSubmit={handleDetailSubmit}
          onClose={() => setShowDetailPopup(false)}
        />
      )}
    </div>
  );
};

export default RequestDetailPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PopupComponent from '../components/PopupComponent';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detailsData, setDetailsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [newDetailDescription, setNewDetailDescription] = useState('');

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/details?problem=${id}`
        );
        setDetailsData(response.data);
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

    fetchDetailsData();
  }, [id]);

  const handleDetailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/details`, {
        problemId: parseInt(id as string, 10),
        description: newDetailDescription,
      });
      setShowDetailPopup(false);
      setNewDetailDescription('');

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/api/details?problem=${id}`
      );
      setDetailsData(response.data);
    } catch (error) {
      console.error('Error adding detail:', error);
    }
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Відображаємо заголовок з описом проблеми */}
      <h1>Деталі проблеми "{detailsData.details[0]?.problem?.description}"</h1>
      {detailsData && detailsData.details.length > 0 ? (
        <ul>
          {/* Виводимо список описів деталей */}
          {detailsData.details.map((detail: any) => (
            <li key={detail.id}>
              <span>{detail.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Дані не знайдено</p>
      )}
      <button onClick={() => setShowDetailPopup(true)}>Додати анамнез</button>
      {showDetailPopup && (
        <PopupComponent
          onClose={() => setShowDetailPopup(false)}
          title='Додати новий амамнез'
          fields={[
            {
              name: 'Опис амамнеза',
              value: newDetailDescription,
              onChange: (e) => setNewDetailDescription(e.target.value),
            },
          ]}
          onSubmit={handleDetailSubmit}
        />
      )}
    </div>
  );
};

export default DetailsPage;

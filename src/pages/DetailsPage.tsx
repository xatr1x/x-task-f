import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detailsData, setDetailsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/details?problem=${id}`);
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
    </div>
  );
};

export default DetailsPage;
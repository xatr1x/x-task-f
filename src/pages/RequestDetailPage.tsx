import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requestData, setRequestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/requests/${id}`);
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

    fetchRequestData();
  }, [id]);

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
          <p><strong>Тип:</strong> {requestData.type.name}</p>
          <p><strong>Бренд:</strong> {requestData.brand.name}</p>
          <p><strong>Модель:</strong> {requestData.model.name}</p>
          {/* Додай більше полів, якщо потрібно */}
        </div>
      ) : (
        <p>Дані не знайдено</p>
      )}
    </div>
  );
};

export default RequestDetailPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RequestComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/requests`);
        setRequests(response.data.requests);
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

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Список заявок</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <Link to={`/requests/${request.id}`}>
              {request.id} - {request.type.name} - {request.brand.name} - {request.model.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestComponent;

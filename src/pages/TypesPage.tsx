import { useEffect, useState } from 'react';
import axios from 'axios';

interface Type {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

const TypesPage = () => {
  const [types, setTypes] = useState<Type[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/types`); // Ваш URL до бекенду
        setTypes(response.data.types);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  // Відображення завантаження, помилки або даних
  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Сталася помилка: {error}</p>;
  }

  return (
    <div>
      <h1>Список типів</h1>
      <ul>
        {types.map((type) => (
          <li key={type.id}>
            <strong>{type.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypesPage;

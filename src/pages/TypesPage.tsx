import { useEffect, useState } from 'react';
import axios from 'axios';

interface Type {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

const TypesPage = () => {
  const [types, setTypes] = useState<Type[]>([]); // Створення стану для зберігання типів
  const [loading, setLoading] = useState<boolean>(true); // Стан для індикації завантаження
  const [error, setError] = useState<string | null>(null); // Стан для індикації помилки

  useEffect(() => {
    // Функція для отримання даних з бекенду за допомогою axios
    const fetchTypes = async () => {
      try {
        setLoading(true); // Початок завантаження
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/types`); // Ваш URL до бекенду
        setTypes(response.data.types); // Збереження отриманих типів у стан
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false); // Завершення завантаження
      }
    };

    fetchTypes(); // Виконання запиту при завантаженні компонента
  }, []); // Порожній масив залежностей, щоб запит виконувався тільки при першому завантаженні сторінки

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

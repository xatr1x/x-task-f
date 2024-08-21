import { useEffect, useState } from 'react';
import axios from 'axios';

interface Brand {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

const BrandsPage = () => {
  const [brands, setbrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true); // Початок завантаження
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/brands`);
        setbrands(response.data.brands);
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
        {brands.map((brand) => (
          <li key={brand.id}>
            <strong>{brand.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsPage;

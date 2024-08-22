import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProblemsPage = () => {
  const [problemsData, setProblemsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/problems`); // Ваш URL до бекенду
        setProblemsData(response.data);
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

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="problems-container">
      <h1>Список проблем за типами</h1>
      {problemsData && problemsData.problems.length > 0 ? (
        problemsData.problems.map((typeProblems, index) => (
          <div key={index} className="problem-type">
            <h2>{typeProblems.type}</h2>
            <ul>
              {typeProblems.problems.map((problem) => (
                <li key={problem.id}>
                  <a href={`/problems/${problem.id}`}>{problem.problem}</a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Немає проблем для відображення.</p>
      )}
    </div>
  );
};

export default ProblemsPage;

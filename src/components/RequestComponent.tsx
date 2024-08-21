import React from 'react';

const RequestComponent = () => {
  const data = [
    {
      id: 1,
      created_at: '2024-08-12 12:50:06.758444',
      type: 'Laptop',
      brand: 'Apple',
      model: 'M2 pro',
      problems: [
        {
          name: 'не включається',
          solutions: [
            {
              description: 'поставити на зарядку',
              comment: 'телефони іноді розряджаються',
            },
            {
              description: 'перевірити батарею',
              comment: 'бла бла бла',
            },
          ],
        },
        {
          name: 'розбитий екран',
          solutions: [
            {
              description: 'замовити новий',
              comment: 'в якомусь магазині',
            },
            {
              description: 'купити захисну плівку',
              comment: 'в іншому магазині',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      {data.map((request) => (
        <div key={request.id} className="request">
          <div className="request-header">
            <div className="request-info">
              <h4 className="request-type">{request.type}</h4>
              <p className="request-brand-model">
                <strong>Brand:</strong> {request.brand} <strong>Model:</strong> {request.model}
              </p>
            </div>
            <div className="request-meta">
              <p><strong>ID:</strong> {request.id}</p>
              <p><strong>Створено:</strong> {new Date(request.created_at).toLocaleString()}</p>
            </div>
          </div>
          <div className="problems">
            {request.problems.map((problem, pIndex) => (
              <div key={pIndex} className="problem">
                <h5 className="problem-name">Проблема: {problem.name}</h5>
                <div className="solutions">
                  <div>Рішення:</div>
                  {problem.solutions.map((solution, sIndex) => (
                    <div key={sIndex} className="solution">
                      <p><strong>Опис:</strong> {solution.description}</p>
                      <p><strong>Коментарій:</strong> {solution.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestComponent;

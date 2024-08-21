import React from 'react';

interface PopupComponentProps {
  title: string;
  fields: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ title, fields, onSubmit, onClose }) => (
  <div className="popup">
    <div className="popup-inner">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label>{field.name}:</label>
            <input
              type="text"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        ))}
        <button type="submit">Додати</button>
      </form>
      <button onClick={onClose} className="close-popup-button">Закрити</button>
    </div>
  </div>
);

export default PopupComponent;

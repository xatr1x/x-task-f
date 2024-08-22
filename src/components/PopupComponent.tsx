import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface FieldProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
  options?: Option[]; // Опції для випадаючого списку
}

interface PopupComponentProps {
  title: string;
  fields: FieldProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  title,
  fields,
  onSubmit,
  onClose,
}) => (
  <div className='popup'>
    <div className='popup-inner'>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label>{field.name}:</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={field.value}
                onChange={
                  field.onChange as React.ChangeEventHandler<HTMLSelectElement>
                }
              >
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type='text'
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          </div>
        ))}
        <button type='submit'>Додати</button>
      </form>
      <button onClick={onClose} className='close-popup-button'>
        Закрити
      </button>
    </div>
  </div>
);

export default PopupComponent;

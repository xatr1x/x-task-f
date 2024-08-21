import React, { useState } from 'react';
import axios from 'axios';
import PopupComponent from './PopupComponent';
import ButtonComponent from './ButtonComponent';

const PopupHandler = () => {
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showBrandPopup, setShowBrandPopup] = useState(false);

  const [requestFormValues, setRequestFormValues] = useState({ type: '', brand: '', model: '' });
  const [typeFormValue, setTypeFormValue] = useState('');
  const [brandFormValue, setBrandFormValue] = useState('');

  const toggleRequestPopup = () => setShowRequestPopup(!showRequestPopup);
  const toggleTypePopup = () => setShowTypePopup(!showTypePopup);
  const toggleBrandPopup = () => setShowBrandPopup(!showBrandPopup);

  const handleRequestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequestFormValues({ ...requestFormValues, [name]: value });
  };

  const handleTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFormValue(e.target.value);
  };

  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandFormValue(e.target.value);
  };

  const handleTypeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/types`, {
        name: typeFormValue,
      });

      console.log('Type created successfully:', response.data);
      toggleTypePopup();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/brands`, {
        name: brandFormValue,
      });

      console.log('Brand created successfully:', response.data);
      toggleBrandPopup();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div>
      <ButtonComponent onClick={toggleRequestPopup} text="Зробити заявку" className="create-request-button" />
      <ButtonComponent onClick={toggleTypePopup} text="Додати тип" className="add-type-button" />
      <ButtonComponent onClick={toggleBrandPopup} text="Додати бренд" className="add-brand-button" /> {/* Додаємо кнопку для відкриття попапа "Бренд" */}

      {showRequestPopup && (
        <PopupComponent
          title="Створити заявку"
          fields={[
            { name: 'Тип', value: requestFormValues.type, onChange: handleRequestInputChange },
            { name: 'Бренд', value: requestFormValues.brand, onChange: handleRequestInputChange },
            { name: 'Модель', value: requestFormValues.model, onChange: handleRequestInputChange },
          ]}
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Request form submitted:', requestFormValues);
            toggleRequestPopup();
          }}
          onClose={toggleRequestPopup}
        />
      )}

      {showTypePopup && (
        <PopupComponent
          title="Додати тип"
          fields={[
            { name: 'Тип', value: typeFormValue, onChange: handleTypeInputChange },
          ]}
          onSubmit={handleTypeSubmit}
          onClose={toggleTypePopup}
        />
      )}

      {showBrandPopup && (
        <PopupComponent
          title="Додати бренд"
          fields={[
            { name: 'Бренд', value: brandFormValue, onChange: handleBrandInputChange },
          ]}
          onSubmit={handleBrandSubmit}
          onClose={toggleBrandPopup}
        />
      )}
    </div>
  );
};

export default PopupHandler;

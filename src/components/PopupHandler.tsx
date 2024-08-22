import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupComponent from './PopupComponent';
import ButtonComponent from './ButtonComponent';

const PopupHandler = () => {
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [showModelPopup, setShowModelPopup] = useState(false);
  const [optionsTypes, setOptionsTypes] = useState<{ id: number, name: string }[]>([]);
  const [optionsBrands, setOptionsBrands] = useState<{ id: number, name: string }[]>([]);
  const [optionsModels, setOptionsModels] = useState<{ id: number, name: string }[]>([]);
  

  const [requestFormValues, setRequestFormValues] = useState({ type: '', brand: '', model: '' });
  const [typeFormValue, setTypeFormValue] = useState('');
  const [brandFormValue, setBrandFormValue] = useState('');
  const [modelFormValue, setModelFormValue] = useState('');

  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');

  const toggleRequestPopup = () => setShowRequestPopup(!showRequestPopup);
  const toggleTypePopup = () => setShowTypePopup(!showTypePopup);
  const toggleBrandPopup = () => setShowBrandPopup(!showBrandPopup);
  const toggleModelPopup = () => setShowModelPopup(!showModelPopup);

  const handleRequestInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRequestFormValues({ ...requestFormValues, [name]: value });
  };


  /**
   *  TYPE
   */
  const handleTypeInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTypeFormValue(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTypeId(e.target.value);
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

  /**
   *  BRAND
   */

  const handleBrandInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBrandFormValue(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrandId(e.target.value);
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

  const handleModelInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setModelFormValue(e.target.value);
  };

  /**
   *  MODEL
   */

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModelId(e.target.value);
  };

  const handleModelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/models`, {
        name: modelFormValue,
        brand: +selectedBrandId,
        type: +selectedTypeId
      });

      console.log('Model created successfully:', response.data);
      toggleModelPopup();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/types`);
        setOptionsTypes(response.data.types);
      } catch (error) {
        console.error('Помилка завантаження типів:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/brands`);
        setOptionsBrands(response.data.brands);
      } catch (error) {
        console.error('Помилка завантаження брендів:', error);
      }
    };

    const fetchModels = async () => {
      try {
        // const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/models?type=${type}&brand=${brand}`);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/models`);
        setOptionsModels(response.data.models);
      } catch (error) {
        console.error('Помилка завантаження моделей:', error);
      }
    }
  
    fetchModels();
    fetchTypes();
    fetchBrands();
  }, []);

  return (
    <div>
      <ButtonComponent onClick={toggleRequestPopup} text="Зробити заявку" className="create-request-button" />
      <ButtonComponent onClick={toggleTypePopup} text="Додати тип" className="add-type-button" />
      <ButtonComponent onClick={toggleBrandPopup} text="Додати бренд" className="add-brand-button" />
      <ButtonComponent onClick={toggleModelPopup} text="Додати модель" className="add-model-button" /> {/* Додаємо кнопку для відкриття попапа "Модель" */}

      {showRequestPopup && (
        <PopupComponent
          title="Створити заявку"
          fields={[
            {
              name: 'Виберіть тип',
              value: selectedTypeId,
              onChange: handleTypeChange,
              type: 'select',
              options: [
                { value: '', label: 'Виберіть варіант' }, // Дефолтна опція
                ...optionsTypes.map(option => ({ value: option.id, label: option.name }))
              ]
            },
            {
              name: 'Виберіть бренд',
              value: selectedBrandId,
              onChange: handleBrandChange,
              type: 'select',
              options: [
                { value: '', label: 'Виберіть варіант' }, // Дефолтна опція
                ...optionsBrands.map(option => ({ value: option.id, label: option.name }))
              ]
            },
            // { name: 'Модель', value: requestFormValues.model, onChange: handleRequestInputChange },
            {
              name: 'Виберіть модель',
              value: selectedModelId,
              type: 'select',
              onChange: handleModelChange,
              options: [
                { value: '', label: 'Виберіть модель' }, // Дефолтна опція
                ...optionsModels.map(option => ({ value: option.id, label: option.name }))
              ]
            }
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

    {showModelPopup && (
      <PopupComponent
        title="Додати модель"
        fields={[
          {
            name: 'Виберіть тип',
            value: selectedTypeId,
            onChange: handleTypeChange,
            type: 'select',
            options: [
              { value: '', label: 'Виберіть варіант' },
              ...optionsTypes.map(option => ({ value: option.id, label: option.name }))
            ]
          },
          {
            name: 'Виберіть бренд',
            value: selectedBrandId,
            onChange: handleBrandChange,
            type: 'select',
            options: [
              { value: '', label: 'Виберіть варіант' },
              ...optionsBrands.map(option => ({ value: option.id, label: option.name }))
            ]
          },
          { name: 'Модель', value: modelFormValue, onChange: handleModelInputChange },
        ]}
        onSubmit={handleModelSubmit}
        onClose={toggleModelPopup}
      />
    )}
    </div>
  );
};

export default PopupHandler;

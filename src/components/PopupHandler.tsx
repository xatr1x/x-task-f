import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupComponent from './PopupComponent';
import ButtonComponent from './ButtonComponent';
import { useNavigate } from 'react-router-dom';

const PopupHandler = () => {
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [showModelPopup, setShowModelPopup] = useState(false);
  const [showProblemPopup, setShowProblemPopup] = useState(false);

  const [optionsTypes, setOptionsTypes] = useState<{ id: number, name: string }[]>([]);
  const [optionsBrands, setOptionsBrands] = useState<{ id: number, name: string }[]>([]);
  const [optionsModels, setOptionsModels] = useState<{ id: number, name: string }[]>([]);
  
  const [typeFormValue, setTypeFormValue] = useState('');
  const [brandFormValue, setBrandFormValue] = useState('');
  const [modelFormValue, setModelFormValue] = useState('');
  const [problemFormValue, setProblemFormValue] = useState('');

  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');

  const toggleRequestPopup = () => setShowRequestPopup(!showRequestPopup);
  const toggleTypePopup = () => setShowTypePopup(!showTypePopup);
  const toggleBrandPopup = () => setShowBrandPopup(!showBrandPopup);
  const toggleModelPopup = () => setShowModelPopup(!showModelPopup);
  const toggleProblemPopup = () => setShowProblemPopup(!showProblemPopup);

  const navigate = useNavigate();

  /**
   *  REQUEST
   */
  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const requestData = {
        typeId: +selectedTypeId,
        brandId: +selectedBrandId,
        modelId: +selectedModelId,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/requests`, requestData);

      toggleRequestPopup();
      navigate(`/requests/${response.data}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  /**
   *  TYPE
   */
  const handleTypeInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTypeFormValue(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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

  /**
   * PROBLEM
   */

  const handleProblemInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProblemFormValue(e.target.value);
  };

  const handleProblemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/problems`, {
        description: problemFormValue,
        typeId: +selectedTypeId,
      });

      console.log('Problem created successfully:', response.data);
      toggleProblemPopup();
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
  
    fetchTypes();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedTypeId && selectedBrandId) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/models`, {
            params: { type: selectedTypeId, brand: selectedBrandId }
          });
          setOptionsModels(response.data.models);
        } catch (error) {
          console.error('Помилка завантаження моделей:', error);
        }
      };
      fetchModels();
    } else {
      setOptionsModels([]); // Очищаємо список моделей, якщо тип або бренд не вибрано
    }
  }, [selectedTypeId, selectedBrandId]);

  return (
    <div>
      <ButtonComponent onClick={toggleRequestPopup} text="Зробити заявку" className="popup-main" />
      <ButtonComponent onClick={toggleTypePopup} text="Додати тип" className="popup-main" />
      <ButtonComponent onClick={toggleBrandPopup} text="Додати бренд" className="popup-main" />
      <ButtonComponent onClick={toggleModelPopup} text="Додати модель" className="popup-main" />
      <ButtonComponent onClick={toggleProblemPopup} text="Додати проблему" className="popup-main" />

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
            {
              name: 'Виберіть модель',
              value: selectedModelId,
              disabled: !(!!selectedBrandId && !!selectedTypeId),
              type: 'select',
              onChange: handleModelChange,
              options: [
                { value: '', label: 'Виберіть варіант' },
                ...optionsModels.map(option => ({ value: option.id, label: option.name }))
              ]
            }
          ]}
          onSubmit={handleRequestSubmit}
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

    {showProblemPopup && (
      <PopupComponent
        title="Додати проблему"
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
            name: 'Проблема', value: problemFormValue, onChange: handleProblemInputChange
          }
        ]}
        onSubmit={handleProblemSubmit}
        onClose={toggleProblemPopup}
      />
    )}
    </div>
  );
};

export default PopupHandler;

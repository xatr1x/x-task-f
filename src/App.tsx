import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import PopupHandler from './components/PopupHandler';
import TypesPage from './pages/TypesPage';
import RequestComponent from './components/RequestComponent';
import BrandsPage from './pages/BrandsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Головна сторінка */}
          <Route
            path="/"
            element={
              <div>
                <PopupHandler />  {/* Додаємо компонент для рендерингу кнопок і попапів */}
                <RequestComponent /> {/* Додаємо RequestComponent для відображення запитів */}
              </div>
            }
          />
          {/* Сторінка з типами */}
          <Route path="/types" element={<TypesPage />} />
          <Route path="/brands" element={<BrandsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

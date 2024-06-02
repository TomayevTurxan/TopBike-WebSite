import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import ScrollToTop from './Helper/helper.jsx';
import CategoryContextProvider from './context/categoryContext.jsx';
import UserProvider from './context/userContext.jsx';
import './index.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CategoryContextProvider>
        <BrowserRouter>
          <Provider store={store}>
            <ScrollToTop />
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </Provider>
        </BrowserRouter>
      </CategoryContextProvider>
    </UserProvider>
  </React.StrictMode>,
)

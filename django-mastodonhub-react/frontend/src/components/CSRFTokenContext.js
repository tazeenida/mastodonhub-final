import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CSRFTokenContext = createContext();

export const useCSRFToken = () => useContext(CSRFTokenContext);

export const CSRFTokenProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/user/get_csrf_token/');
        console.log('CSRF token fetched: ', response.data);
        setCsrfToken(response.data); // Assuming the token is in the response body
      } catch (error) {
        console.error('Failed to fetch CSRF token', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CSRFTokenContext.Provider value={csrfToken}>
      {children}
    </CSRFTokenContext.Provider>
  );
};
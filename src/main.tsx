import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterUrl from './router.tsx'
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouterUrl />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

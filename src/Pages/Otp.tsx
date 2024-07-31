import OtpInput from '@/Components/Otp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#68a502',
    },
    secondary: {
      main: '#4b8e2b',
    },
    success: {
      main: '#68a502',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <OtpInput />
    </ThemeProvider>
  );
};

export default App;

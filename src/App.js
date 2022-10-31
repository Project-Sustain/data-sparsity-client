import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from './library/colors';
import Main from './Main';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    tertiary: {
      main: colors.tertiary
    }
  }
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
    );
}

import { createMuiTheme } from '@material-ui/core/styles';
import { blue, lightblue, green, yellow, grey } from '@material-ui/core/colors';

const themes = [];

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
  },
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: yellow[500],
    },
    disem: {
      appNavBar: '#424242',
    },
  },
});


export default defaultTheme;

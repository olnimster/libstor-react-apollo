import red from '@material-ui/core/colors/red';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#3e72ff',
            dark: '#115293'
        },
        secondary: {
            main: '#e01d31',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    test: {
        margin:
            {main: '100px'}
    }
});

export default theme;
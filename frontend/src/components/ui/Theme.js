import { createMuiTheme } from '@material-ui/core/styles';

const primColor = "#235a33"
const primColorDark = "#103d1d"
const primColorLight = "#668f72"
const secColor = "#c0af70"
const secColorDark = "#918455"
const secColorLight = "#eae4bd"

export default createMuiTheme({
  palette: {
    common: {
      white: "#fff"
    },
    primary: {
      main: `${primColor}`,
      light: `${primColorLight}`,
      dark: `${primColorDark}`,
    },
    secondary: {
      main: `${secColor}`,
      light: `${secColorLight}`,
      dark: `${secColorDark}`,
    },
  },
  typography: {
    h5: {
      lineHeight: 2,
      fontWeight: 700
    }
  }
})

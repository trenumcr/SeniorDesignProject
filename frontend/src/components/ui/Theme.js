import { createMuiTheme } from '@material-ui/core/styles';

const primColor = "#3BA0A9"
const secColor = "#FFFFFF"

export default createMuiTheme({
  palette: {
    common: {
      teal: `${primColor}`,
      white: `${secColor}`
    },
    primary: {
      main: `${primColor}`
    },
    secondary: {
      main: `${secColor}`
    }
  }
})

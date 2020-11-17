import Header from "./ui/Header";
import Home from "./ui/Home";
import Account from "./ui/Account";
import Category from "./ui/Category";
import Component from "./ui/Component";
import ExpertList from "./ui/ExpertList";
import Forum from "./ui/Forum";
import Login from "./ui/Login";
import Register from "./ui/Register";
import Search from "./ui/Search";
import Profile from "./ui/Profile";
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './ui/Theme'
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/profile" component={() => <Profile />} />
          <Route exact path="/search-component" component={() => <Search />} />
          <Route exact path="/categories" component={() => <Category />} />
          <Route exact path="/component" component={() => <Component />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/sign-up" component={() => <Register />} />
          <Route exact path="/account" component={() => <Account />} />
          <Route exact path="/forums" component={() => <Forum />} />
          <Route exact path="/experts" component={() => <ExpertList />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

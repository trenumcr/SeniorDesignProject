import Header from "./ui/Header";
import Home from "./ui/Home";
import Account from "./ui/Account";
import AddComponent from "./ui/AddComponent";
import EditComponent from "./ui/EditComponent";
import Category from "./ui/Category";
import Component from "./ui/Component";
import ExpertList from "./ui/ExpertList";
import Forum from "./ui/Forum";
import Login from "./ui/Login";
import SignUp from "./ui/SignUp";
import Search from "./ui/Search";
import PasswordReset from "./ui/PasswordReset";
import Profile from "./ui/Profile";
import Footer from "./ui/Footer";
import EditProfile from "./ui/EditProfile";
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './ui/Theme'
import { makeStyles } from '@material-ui/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/profile/:username" render={({ match }) => <Profile match={match} mine={true} />} />
          <Route exact path="/password-reset/:token" render={({ match }) => <PasswordReset match={match} mine={true} />} />
          <Route exact path="/edit-component/:componentId" component={() => <EditComponent />} />
          <Route exact path="/edit-profile" component={() => <EditProfile />}/>
          <Route exact path="/search-component" component={() => <Search />} />
          <Route path="/search-component/:componentName" component={() => <Search />} />
          <Route exact path="/categories" component={() => <Category />} />
          <Route exact path="/component" component={() => <Component />} />
          <Route path="/component/:componentId" component={() => <Component />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/sign-up" component={() => <SignUp />} />
          <Route exact path="/account" component={() => <Account />} />
          <Route exact path="/forums" component={() => <Forum />} />
          <Route exact path="/experts" component={() => <ExpertList />} />
          <Route exact path="/add-component" component={() => <AddComponent />} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

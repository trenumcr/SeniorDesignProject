import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, useTheme } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MemoryIcon from '@material-ui/icons/Memory';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ForumIcon from '@material-ui/icons/Forum';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from "../../static/images/logo1IntoWordsBlack.png";

const drawerWidth = 240;

class SearchField extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    window.location.href = "/search-component/"+this.state.value;
    event.preventDefault();
    /*
    this.props.navigation.navigate( "/search-component", {
      custparam: "passed",
    })
    */
  }

  render(){
    const inputclasses = makeStyles(theme => ({
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }))
    return(
      <form onSubmit={this.handleSubmit}>
        <InputBase
          placeholder="Search…"
          style={{color: '#FFF'}}
          classes={{
            root: inputclasses.inputRoot,
            input: inputclasses.inputInput,
          }}

          inputProps={{ 'aria-label': 'search' }}
          onChange={this.handleChange}
          />
        </form>
    )
  }
}

  const useStyles = makeStyles(theme => ({
    toolbarMargin: {
      ...theme.mixins.toolbar,
    },
    grow: {
      flexGrow: 1,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
      display: 'block',
      filter: 'invert(100%)',
      },
    },
    search: {
      float: 'right',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      },
    searchField: {
      padding: theme.spacing(0, 6),
      position: 'relative',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));



  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      });
    }



  class LoginLogout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
      };
      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        console.log(`logged out`)
        console.log(localStorage.getItem('token'))
        this.state.token = "";
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload(false);
    }

    render() {
      if (this.state.token != null) {
        return (<Typography>Hello, <Button style={{ color: '#FFFFFF' }} component={Link} to={"/profile/" + this.state.username}>{this.state.username}</Button>!<Button color="inherit" component={Link} onClick={this.handleLogout}> Logout</Button></Typography> );
      }
      else {
          return (<Button color="inherit" component={Link} to="/login">Login</Button>);
      }
    }
  }

  export default function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    var drawerIconList = [<AccountCircleIcon />, <MemoryIcon />, <FindInPageIcon />, <ForumIcon />, <SettingsIcon />]
    var drawerLinkList = ["/login", "/search-components", "/experts"]
    var drawerLinkListText = ["Login or Sign up", "Search Components", "Search Experts"]
    const [open, setOpen] = React.useState(false);

    if (localStorage.getItem('username') != null) {
      drawerIconList = [<AccountCircleIcon />, <MemoryIcon />, <FindInPageIcon />, <ForumIcon />, <SettingsIcon />]
      drawerLinkList = ["/profile/" + localStorage.getItem('username'), "/search-components", "/experts","/edit-profile"]
      drawerLinkListText = ["Your Profile", "Search Components", "Search Experts","Edit Your Profile"]
    }

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const onSubmitHandler = (e) => {
      e.preventDefault();
      window.location.href = "/search-component";
    };

    return (
      <React.Fragment>
        <ElevationScroll>
          <AppBar position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon style={{ color: '#FFFFFF' }} />
              </IconButton>
              <Button component={Link} to="/" color="secondary">
                <Typography variant="h6" className={classes.title} noWrap>
                  <img src={logo} alt="Component Clip Art"  height="40px"/>
                </Typography>
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <div className={classes.searchField}>
                  <SearchField />
                </div>
              </div>
              <div className={classes.grow} />
              <LoginLogout/>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {drawerLinkListText.map((text, index) => (
              <ListItem button key={text} component={Link} to={drawerLinkList[index]}>
                <ListItemIcon>{drawerIconList[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              ))}
            </List>
          </Drawer>
        <div className={classes.toolbarMargin} />
      </React.Fragment>
    );
  }

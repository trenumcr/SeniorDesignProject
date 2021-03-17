import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import axiosInstance from './../../axiosApi.js';

const axiosI = axiosInstance;

const componentInfo =
  {
    name: "ComponentName",
    priceHigh: "15.00",
    priceLow: "10.00",
    rating: "8",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis mi sit amet purus rhoncus, sed eleifend neque imperdiet. Integer at nisl et erat venenatis fermentum non eu lectus. Donec ut tortor iaculis, consectetur est vel, venenatis elit. Sed at ultrices mi. Aliquam sed justo magna. Nulla accumsan nec nisi sed ullamcorper. Suspendisse et velit fermentum, interdum ante et, consequat ipsum. Sed ullamcorper lectus in egestas dignissim. Nullam sodales in sapien viverra convallis. Integer mauris lorem, scelerisque a consectetur sit amet, faucibus nec dui.",
    features: ["feature 1", "feature 2", "feature 3", "feature 4"],
    documents:[
      {
        name: "User Submitted Photos",
        date: "January 9, 2014",
        icon: <ImageIcon />
      },
      {
        name: "Data sheet",
        date: "January 7, 2014",
        icon: <PictureAsPdfIcon />
      },
      {
        name: "Other documentation",
        date: "July 20, 2014",
        icon: <PictureAsPdfIcon />
      }
    ],
    keyTerms: ["Type", "Voltage", "Power"],
    user: "User",
    userText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis mi sit amet purus rhoncus, sed eleifend neque imperdiet. Integer at nisl et erat venenatis fermentum non eu lectus. Donec ut tortor iaculis, consectetur est vel, venenatis elit. Sed at ultrices mi. Aliquam sed justo magna. Nulla accumsan nec nisi sed ullamcorper."
  }

  var comments = [
    {
    userName: "UserName1",
    date: "December 4, 2020",
    text: "Had issues with A on..."
    },
    {
      userName: "UserName2",
      date: "April 23, 2020",
      text: "Had issues with B on..."
    },
    {
      userName: "UserName3",
      date: "February 10, 2020",
      text: "Had issues with C on..."
    },
  ]

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    backgroundColor: '#e5e5e5',
    width: '100%',
    paddingTop: '100%',
  },
  box: {
    paddingLeft: 20,
  },
  tab: {
    minWidth: 100,
    width: '33%',
  },
  tabPanel: {
    height: 270,
    overflow: 'scroll',
  },
  text: {
    paddingLeft: 20,
  },
  commentWrap: {
    paddingBottom: 50,
  },
  rating: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
    button: {
      background: theme.palette.secondary.main,
      '&:hover': {
        background: theme.palette.secondary.dark,
      }
    },
    buttonText: {
      color: theme.palette.common.white,
      textDecoration: 'none',
    },
}));

class ComponentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      component: {
        features: [],
        documents: [],
        keyTerms: [],
        comments: []
      },
      value:0,
    }//{value:0, commentValue:""};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axiosI.get('/components', {
      params: { "_id": this.props.componentId }
    })
    .then(component => {
      this.setState({ component: component.data });
    })
    .catch(function (error) {
        console.log(error);
    })
  }
  
  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() {
    return(
      <Container component="main" maxWidth="md">
        <Grid container direction="row" justify="center" alignItems="flex-start">
          <Grid container item xs={12} md={6} lg={6} direction="column">
            <Grid item xs={12} className={this.props.classes.image}>
              {this.state.component.picture}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" className={this.props.classes.rating}>
                Rating: {this.state.component.rating}/5
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" className={this.props.classes.button}>
                <Typography variant="button" align="center">
                  <a className={this.props.classes.buttonText} href="/experts">Find an Expert</a>
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} lg={6} direction="column" className={this.props.classes.box}>
            <Grid item xs={12}>
              <Typography variant="h3" className={this.props.classes.rating}>
                {this.state.component.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={this.props.classes.rating}>
                Estimated Price: ${this.state.component.price} {/*${componentInfo.priceLow} - ${componentInfo.priceHigh} No Price Estimate Yet*/}
              </Typography>
            </Grid>
            <Grid item xs={12} className={this.props.classes.tabs}>
              <Tabs value={this.state.value} onChange={this.handleChange} aria-label="tabs" indicatorColor="primary"
      textColor="primary">
                <Tab className={this.props.classes.tab} label="Description" {...a11yProps(0)} />
                <Tab className={this.props.classes.tab} label="Features" {...a11yProps(1)} />
                <Tab className={this.props.classes.tab} label="Documents" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={this.state.value} index={0} className={this.props.classes.tabPanel}>
                {this.state.component.description}
              </TabPanel>
              <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                <ul>
                  {this.state.component.features.map((feature) => (
                    <li>{feature}</li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel value={this.state.value} index={2} className={this.props.classes.tabPanel}>
                <List className={this.props.classes.root}>
                  {this.state.component.documents.map((document) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          {document.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={document.name} secondary={document.date} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className={this.props.classes.keyTerms} style={{paddingTop: 10}}>
                Key Terms:
              </Typography>
              {this.state.component.keyTerms.map((term) => (
                <Button color="secondary"><u>{term}</u></Button>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h5" style={{paddingTop: 20, paddingBottom: 10}}>
              Posted by: {this.state.component.user}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {this.state.component.userText}
            </Typography>
          </Grid>
          <Grid container item direction="column" xs={12} className={this.props.classes.comments}>
            <Divider variant="middle" style={{marginTop: 20}}/>
            <Grid item xs={12}>
              <Typography variant="h4" style={{paddingTop: 20, paddingBottom: 10}}>
                Comments
              </Typography>
            </Grid>
            <Grid container item direction="column" spacing={2} xs={12} className={this.props.classes.commentWrap}>
              <Grid container item direction="row">
                <Avatar xs={1} style={{marginTop: 15}}></Avatar>
                <Grid item xs={11} style={{paddingLeft: 20}}>
                  <TextField
                    label="Add a comment..."
                    multiline
                    fullWidth
                    rowsMax={4}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify='flex-end'>
                <Button variant="contained" className={this.props.classes.button}>
                  <Typography variant="button" align="center" className={this.props.classes.buttonText}>
                    Post Comment
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            {this.state.component.comments.map((comment) => (
              <Grid container item direction="row" xs={12} className={this.props.classes.commentWrap}>
                <Avatar xs={1}></Avatar>
                <Grid container item direction="column" xs={10} s={11} className={this.props.classes.text}>
                  <Grid item className={this.props.classes.username}>
                    <Typography variant="body1">
                      <b>{comment.user}</b> <span style={{fontWeight: 100}}>{comment.date}</span>
                    </Typography>
                  </Grid>
                  <Grid item className={this.props.classes.commentText}>
                    <Typography variant="body1">
                      {comment.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    )
  }
}


export default function LaunchProfile() {
  const componentParam = useParams();
  const classes = useStyles();
  return(
    <ComponentProfile componentId={componentParam.componentId} classes={classes} />
  );
}

/*
export default function PassSearchParam() {
  const componentParam = useParams();
  const classes = useStyles()
  return(
    <ComponentGrid searchParam={componentParam.componentName} classes={classes} />
  );
}
*/
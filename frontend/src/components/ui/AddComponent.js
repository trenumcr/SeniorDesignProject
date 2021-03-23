import React from 'react';
import { Link } from "react-router-dom";

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
import axiosInstance from './../../axiosApi.js';

const axiosI = axiosInstance;


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
    upload: {
      background: theme.palette.secondary.light,
      '&:hover': {
        background: theme.palette.secondary.main,
      }
    },
    buttonText: {
      color: theme.palette.common.white,
      textDecoration: 'none',
    },
}));

class AddComponentForm extends React.Component {

  constructor(props) 
  {
    super(props);
    this.state=
    {
      token: localStorage.getItem('token') ? "Token "+localStorage.getItem('token') : "",
      username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
      value: 0,
      newComponent: 
      {
        name:"",
        picture:"",
        price:"",
        description:"",
        features:{
          feature1: "",
          feature2: "",
          feature3: ""
        },
        documents:{
          referenceSheet:"",
          additionalImages:[],
          additionalDocuments:[]
        },
        tags:[],
        rating:"",
        review:"",
        manufacture_name:"",
        category:"",
      },
    }
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleNameChange = (event) => {
    this.state.newComponent.name = event.target.value;
  }

  handlePriceChange = (event) => {
    this.state.newComponent.price = event.target.value;
  }

  handlePictureChange = (event) => {
    this.state.newComponent.picture = event.target.value;
  }

  handleDescriptionChange = (event) => {
    this.state.newComponent.description = event.target.value;
  }

  handleFeature1Change = (event) => {
    this.state.newComponent.features.feature1 = event.target.value;
  }
  handleFeature2Change = (event) => {
    this.state.newComponent.features.feature2 = event.target.value;
  }
  handleFeature3Change = (event) => {
    this.state.newComponent.features.feature3 = event.target.value;
  }

  handleReferenceSheetChange = (event) => {
    this.state.newComponent.documents.referenceSheet = event.target.value;
  }

  handleAdditionalImagesChange = (event) => {
    this.state.newComponent.documents.additionalImages = event.target.value;
  }

  handleAdditionalDocumentsChange = (event) => {
    this.state.newComponent.documents.additionalDocuments = event.target.value;
  }

  handleTagsChange = (event) => {
    var tags = event.target.value.split(",");
    this.state.newComponent.tags = tags;
  }

  handleRatingChange = (event) => {
    if (!(isNaN(event.target.value))) // Make sure field value is a number
      this.state.newComponent.rating = event.target.value;
  }

  handleReviewChange = (event) => {
    this.state.newComponent.review = event.target.value;
  }

  handleManufacturerChange = (event) => {
    this.state.newComponent.manufacture_name = event.target.value;
  }

  handleHardwareCategoryChange = (event) => {
    this.state.newComponent.category = event.target.value;
  }

  // Inputs
  //const estPrice = useRef<TextFieldProps>(null);

  postComponent = (event) => {
    event.preventDefault();
    axiosI.post('/components/auth/', 
      {
        user: {
          'username' : this.state.username
        },
        name:this.state.newComponent.name,
        picture:this.state.newComponent.picture,
        price:this.state.newComponent.price,
        description:this.state.newComponent.description,
        features:{
          feature1: this.state.newComponent.features.feature1,
          feature2: this.state.newComponent.features.feature2,
          feature3: this.state.newComponent.features.feature3
        },
        documents:{
          referenceSheet:this.state.newComponent.documents.referenceSheet,
          additionalImages:this.state.newComponent.documents.additionalImages,
          additionalDocuments:this.state.newComponent.documents.additionalDocuments
        },
        tags:this.state.newComponent.tags,
        rating:this.state.newComponent.rating,
        review:this.state.newComponent.review,
        manufacture_name:this.state.newComponent.manufacture_name,
        category:this.state.newComponent.category,
      },
      {
        headers: {
          'Authorization': this.state.token
        },
      }
    )
      .then(res => {
        console.log(res);
        window.location.reload(); 
    })
  }

  render(){
    return(
      <Container component="main" maxWidth="md">
        <form className={this.props.classes.form} noValidate>
          <Grid container direction="row" justify="center" alignItems="flex-start">
            <Grid container item xs={12} md={6} lg={6} direction="column">
              <Grid item xs={12} className={this.props.classes.image}>
                <Button variant="contained" component="label" className={this.props.classes.upload}>
                  Upload Image
                  <input type="file" onChange={this.handlePictureChange} hidden/>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" className={this.props.classes.rating}>
                  Your Rating:
                  <TextField margin="normal" required id="rating" label="rating" name="rating" onChange={this.handleRatingChange} />/5
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} lg={6} direction="column" className={this.props.classes.box}>
              <Grid item xs={12}>
                <Typography variant="h3" className={this.props.classes.rating}>
                  <TextField required fullWidth id="name" label="Component Name" name="rating" onChange={this.handleNameChange} autoFocus/>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" className={this.props.classes.rating}>
                  Estimated Price: <TextField onChange={this.handlePriceChange} margin="normal" required id="price" label="Price"/>
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
                  <TextField fullWidth id="description" label="Description" onChange={this.handleDescriptionChange}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                  <ul>
                    <li>
                      <TextField fullWidth id="feature1" label="Feature" onChange={this.handleFeature1Change} />
                    </li>
                    <li>
                      <TextField fullWidth id="feature2" label="Feature" onChange={this.handleFeature2Change} />
                    </li>
                    <li>
                      <TextField fullWidth id="feature3" label="Feature" onChange={this.handleFeature3Change} />
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel value={this.state.value} index={2} className={this.props.classes.tabPanel}>
                  <List className={this.props.classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><DescriptionIcon/></Avatar>
                      </ListItemAvatar>
                      <Button variant="contained" component="label" className={this.props.classes.upload}>
                        Upload Refrence Sheet
                        <input onChange={this.handleReferenceSheetChange} type="file" hidden/>
                      </Button>
                      <ListItemText/>
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><ImageIcon/></Avatar>
                      </ListItemAvatar>
                      <Button variant="contained" component="label" className={this.props.classes.upload}>
                        Upload Additional Images
                        <input type="file" onChange={this.handleAdditionalImagesChange} hidden/>
                      </Button>
                      <ListItemText/>
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><PictureAsPdfIcon/></Avatar>
                      </ListItemAvatar>
                      <Button variant="contained" component="label" className={this.props.classes.upload}>
                        Upload Additional Documents
                        <input type="file" onChange={this.handleAdditionalDocumentsChange} hidden/>
                      </Button>
                      <ListItemText/>
                    </ListItem>
                  </List>
                </TabPanel>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className={this.props.classes.keyTerms} style={{paddingTop: 10}}>
                  Tags:
                </Typography>
                <TextField fullWidth id="tag1" label="Enter tags in a comma separated list" onChange={this.handleTagsChange} />
              </Grid>
            </Grid>
            <Grid container item md={12} spacing={4} justify="center" >
              <Grid item xs={4} >
                <Typography className={this.props.classes.manufacturer} style={{paddingTop: 10}}>
                  Manufacturer:
                </Typography>
                <TextField fullWidth id="manufacturer" onChange={this.handleManufacturerChange} />
              </Grid>
              <Grid item xs={4} >
                <Typography className={this.props.classes.hardwareCategory} style={{paddingTop: 10}}>
                  Hardware Category:
                </Typography>
                <TextField fullWidth id="hardwareCategory" onChange={this.handleHardwareCategoryChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" justify="center" alignItems="flex-start">
            <Grid item xs={12}>
              <Typography variant="body1">

              </Typography>
            </Grid>
            <Grid container item direction="column" xs={12} className={this.props.classes.comments}>
              <Divider variant="middle" style={{marginTop: 20}}/>
              <Grid item xs={12}>
                <Typography variant="h4" style={{paddingTop: 20, paddingBottom: 10}}>
                  Your Review:
                </Typography>
                <TextField fullWidth id="review" label="Describe your experience" onChange={this.handleReviewChange} />
              </Grid>
              <Grid container item xs={12} justify='flex-end'>
                <Button variant="contained" className={this.props.classes.button}>
                  <Typography variant="button" align="center" onClick={this.postComponent} className={this.props.classes.buttonText}>
                    Post Component
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

export default function AddComponent() {
  const classes = useStyles();
  return(
    <AddComponentForm classes={classes} />
  )
}

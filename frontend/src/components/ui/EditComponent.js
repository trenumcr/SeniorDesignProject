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
import Carousel from 'react-material-ui-carousel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axiosInstance from './../../axiosApi.js';
import { withStyles } from '@material-ui/core/styles';

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

const useStyles = theme => ({
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
});

class EditComponent extends React.Component {

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
        picture:[""],
        price:"",
        description:"",
        features: [""],
        documents:{
          referenceSheet:"",
          additionalDocuments:[""]
        },
        tags:[""],
        rating:"",
        review:"",
        manufacture_name:"",
        category:"",
      },
      isUser: true,
    }
  }

  componentDidMount = (e) => {

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

  handleFeatureChange = (e) => {
    this.state.newComponent.features[e.currentTarget.attributes[1].nodeValue] = e.target.value;
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

  addImageUpload = (e) => {
    this.setState({
      newComponent: {
        image: this.state.newComponent.features.concat("")
      }
    })
  }

  addFeature = (e) => {
    this.setState({
      newComponent: {
        features: this.state.newComponent.features.concat("")
      }
    })
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
        features:this.state.newComponent.features,
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
    if (!this.state.isUser) {
      return (<Typography variant="h4" style={{padding: '20px'}}>Please login to edit this component</Typography>)
    }

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
              <Grid container item xs={12}>
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={this.props.classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Your rating</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={this.handleRatingChange}
                      label="Age"
                      required
                      id="rating"
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h4" className={this.props.classes.rating}>
                    <div style={{paddingTop: '10px'}}>/5</div>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={4} >
                <Grid item xs={6} >
                  <Typography className={this.props.classes.manufacturer} style={{paddingTop: 10}}>
                    Manufacturer:
                  </Typography>
                  <TextField fullWidth id="manufacturer" onChange={this.handleManufacturerChange} />
                </Grid>
                <Grid item xs={6} >
                  <Typography className={this.props.classes.hardwareCategory} style={{paddingTop: 10}}>
                    Hardware Category:
                  </Typography>
                  <TextField fullWidth id="hardwareCategory" onChange={this.handleHardwareCategoryChange} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} lg={6} direction="column" className={this.props.classes.box}>
              <Grid item xs={12}>
                <Typography variant="h3" className={this.props.classes.rating}>
                  <TextField required fullWidth id="name" label="Component Name" variant="outlined" name="rating" onChange={this.handleNameChange} autoFocus/>
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <TextField onChange={this.handlePriceChange} margin="normal" variant="outlined" required id="price" label="Estimated price"/>
              </Grid>
              <Grid item xs={12} className={this.props.classes.tabs}>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="tabs" indicatorColor="primary"
        textColor="primary">
                  <Tab className={this.props.classes.tab} label="Description" {...a11yProps(0)} />
                  <Tab className={this.props.classes.tab} label="Features" {...a11yProps(1)} />
                  <Tab className={this.props.classes.tab} label="Documents" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={this.state.value} index={0} className={this.props.classes.tabPanel}>
                  <TextField fullWidth multiline rows={8} id="description" variant="outlined" label="Description" onChange={this.handleDescriptionChange}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                  <ul>
                    {this.state.newComponent.features.map((feature, index) => (
                      <li>
                        <Grid container sm={12}>
                          <Grid container sm={8}>
                            <TextField fullWidth id={index} label="Feature" onChange={this.handleFeatureChange} />
                          </Grid>
                        </Grid>
                      </li>
                    ))}
                    <Grid container sm={2}>
                      <Button style={{color: "#235a33", paddingTop: '20px', paddingLeft: '20px', float: 'right'}}/>
                    </Grid>
                      <Button variant="contained" className={this.props.classes.button}  style={{color: "#235a33", paddingLeft: '20px'}} onClick={this.addFeature}>
                        <Typography variant="button" align="center" className={this.props.classes.buttonText}>
                          Add Feature
                        </Typography>
                      </Button>
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
                <TextField fullWidth id="tag1" multiline label="Enter tags in a comma separated list" onChange={this.handleTagsChange} />
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
                <TextField fullWidth id="review" multiline rows={4} variant="outlined" label="Describe your experience" onChange={this.handleReviewChange} />
              </Grid>
              <Grid container item xs={12} justify='flex-end'>
                <Button variant="contained" className={this.props.classes.button} style={{marginTop: '20px'}}>
                  <Typography variant="button" align="center" onClick={this.postComponent} className={this.props.classes.buttonText}>
                    Update Component
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

export default withStyles(useStyles)(EditComponent)
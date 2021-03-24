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
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

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
}));

class EditComponent extends React.Component {

  constructor(props)
  {
    super(props);
    
    this.state=
    {
      token: localStorage.getItem('token') ? "Token "+localStorage.getItem('token') : "",
      username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
      id:'',
      value: 0,
      name:"",
      picture:[],
      price:"",
      description:"",
      features: [""],
      datasheets:[""],
      tags:[""],
      rating:"",
      review:"",
      manufacture_name:"",
      category:"",
      added: false,
      isUser: false,
      open: false,
      result: "",
    };


    if (this.state.username == "" || this.state.token == "") {
        this.setState({
          isUser: false,
        });
    }
    else {
        this.state.isUser = true;
    }
  }

  handleOpenResultModal = () => {
    this.setState({ open:true });
  };

  handleCloseResultModal = () => {
    this.setState({ open:false });
  };

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleNameChange = (event) => {
    this.state.name = event.target.value;
  }

  handlePriceChange = (event) => {
    this.state.price = event.target.value;
  }

  handlePictureChange = (e) => {
    this.state.picture[e.currentTarget.attributes[1].nodeValue] = e.target.value;
  }

  handleDescriptionChange = (e) => {
    this.state.description = e.target.value;
  }

  handleFeatureChange = (e) => {
    this.state.features[e.currentTarget.attributes[1].nodeValue] = e.target.value;
  }

  handleDatasheetChange = (e) => {
    this.state.datasheets[e.currentTarget.attributes[1].nodeValue] = e.target.value;
  }

  handleTagsChange = (event) => {
    var tags = event.target.value.split(",");
    this.setState({
      tags: tags
    })
  }

  handleRatingChange = (event) => {
    this.setState({
      rating: event.target.value
    })
  }

  handleReviewChange = (event) => {
    this.setState({
      review: event.target.value
    })
    this.state.review = event.target.value;
  }

  handleManufacturerChange = (event) => {
    this.setState({
      manufacture_name: event.target.value
    })
  }

  handleHardwareCategoryChange = (event) => {
    this.setState({
      category: event.target.value
    })
  }

  addDatasheetUpload = (e) => {
    this.setState({
      datasheets: this.state.datasheets.concat("")
    })
  }

  addPictureUpload = (e) => {
    this.setState({
      pictures: this.state.pictures.concat("")
    })
  }

  addFeature = (e) => {
    this.setState({
      features: this.state.features.concat("")
    })
  }

  // Inputs
  //const estPrice = useRef<TextFieldProps>(null);

  postComponent = (event) => {
    event.preventDefault();
    if (this.state.tags.length == 0) {
      this.state.tags = [""];
    }

    if (this.state.features.length == 0) {
      this.state.features = [""];
    }

    if (this.state.features.length == 0) {
      this.state.picture = [""];
    }

    var editFields = {
      name:this.state.name,
      picture:this.state.picture,
      price:this.state.price,
      description:this.state.description,
      datasheets: this.state.datasheet,
      features:this.state.features,
      tags:this.state.tags,
      rating:this.state.rating,
      review:this.state.review,
      manufacture_name:this.state.manufacture_name,
      category:this.state.category,
    };

    var updates = {};
    for (const field in editFields) {
        if (`${editFields[field]}` != '' && `${editFields[field]}` != ['']) {
          updates[`${field}`] = editFields[field];
        }
    }
    updates['id'] = this.props.componentId;

    axiosI.patch('/components/auth/',
      updates,
      {
        headers: {
          'Authorization': this.state.token
        },
      }
    )
      .then(res => {
        this.setState({ result: "Success" })
        this.handleOpenResultModal();
        this.setState({
          id: res.data._id.$oid,
          added: true,
        })
    })
    .catch(e => {
      this.setState({ result: "Failure" })
      this.handleOpenResultModal();
      this.setState({
        added: false,
      });
      console.log(e);
    });
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
                  <TextField required defaultValue={this.state.name} fullWidth id="name" label="Component Name" variant="outlined" name="rating" onChange={this.handleNameChange} autoFocus/>
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
                    {this.state.features.map((feature, index) => (
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
        <div>
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={this.props.classes.modal}
          open={this.state.open}
          onClose={this.handleCloseResultModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={this.props.classes.paper}>
              <h2 id="transition-modal-title">Update {this.state.result}</h2>
            </div>
          </Fade>
        </Modal>
        </div>
      </Container>
    )
  }
}

export default function LaunchEditComponent() {
  return(
    <EditComponent componentId={useParams().componentId} classes={useStyles()} />
  );
}

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
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axiosInstance from './../../axiosApi.js';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';

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
      maxHeight: '500px',
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

    this.state = {
      token: localStorage.getItem('token') ? "Token "+localStorage.getItem('token') : "",
      username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
      id:'',
      value: 0,
      name:"",
      pictures:[""],
      price:"",
      description:"",
      features: [""],
      datasheets:[""],
      tags:[""],
      rating:{},
      review:"",
      manufacture_name:"",
      category:"",
      added: false,
      isUser: false,
      open: false,
      imageData: [""],
      docData: [""],
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

  componentDidMount() {
    axiosI.get('/components', {
      params: { "_id": this.props.componentId }
    })
    .then(component => {
      if (component.data.who == localStorage.getItem('username')) {
        this.setState({
          isUser: true,
        })
      }
      else {
        this.setState({
          isUser: false,
        })
      }
      // Convert documents object to array
      this.setState(
          {
            user: component.data.who,
            pictures: component.data.pictures,
            rating: component.data.rating,
            description: component.data.description,
            features: component.data.features,
            datasheets: component.data.datasheets,
            name: component.data.name,
            price: component.data.price,
            tags: component.data.tags,
            review: component.data.review,
            comments: component.data.comments,
            manufacture_name: component.data.manufacture_name,
            category: component.data.category,
          }
        );
        console.log(this.state);

        return this.state.pictures.forEach((picture, index) => {
              axiosI.get('/components/file/', {
                params: { "id": picture.id.$oid }
              })
              .then(image => {
                this.setState({
                  imageData: this.state.imageData.concat(image.data[0].$binary),
                })
              })
            });
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value
    })
  }

  handlePictureUpload = (e) => {
    var url = '/components/auth/';
    var formData = new FormData();
    var imagefile = e.target.files[0];
    formData.append("pictures", imagefile);
    formData.append("id", this.props.componentId);

    var data = {
      id: this.props.componentId,
      pictures: formData
    }
    console.log(data.id + " " + data.pictures + " " + this.state.token);
    axiosI.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': this.state.token
    }}).then(response => {
      this.setState({
        pictures: this.state.pictures.concat(response.data),
      })

       return axiosI.get('/components/file/', {
        params: { "id": response.data.pictures[response.data.pictures.length-1].id.$oid }
      })
      .then(image => {
        this.setState({
          imageData: this.state.imageData.concat(image.data[0].$binary),
        })
        console.log(response);
        console.log(image);
        console.log(this.state);
      })
    })
  }

  handlePictureDelete = (e) => {
      /*var url = '/components/auth/';
      var formData = new FormData();
      var imagefile = e.target.files[0];
      formData.append("pictures", imagefile);
      formData.append("id", this.props.componentId);

      var data = {
        id: this.props.componentId,
        pictures: formData
      }
      console.log(data.id + " " + data.pictures + " " + this.state.token);
      axiosI.delete(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': this.state.token
      }}).then(response => {
        this.setState({
          pictures: this.state.pictures.filter(picture => picture._id.$oid != response.data.id.$oid),
        })
      })*/
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleFeatureChange = (e) => {
    this.state.features[e.currentTarget.attributes[1].nodeValue] = e.target.value;
    this.setState({
      features: this.state.features
    })
  }

  handleDatasheetUpload = (e) => {
    var url = '/components/auth/';
    var formData = new FormData();
    var docfile = e.target.files[0];
    formData.append("datasheets", docfile);
    formData.append("id", this.props.componentId);

    axiosI.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': this.state.token
    }}).then(response => {
      this.state = response.data;
      this.setState({
        datasheets: this.state.datasheets,
      })
    })
  }

  handleDatasheetDelete = (e) => {

  }

  handleTagsChange = (event) => {
    var tags = event.target.value.split(",");
    this.setState({
      tags: tags
    })
  }

  handleRatingChange = (event) => {
    this.setState({
      newRating: event.target.value
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

    var data = {
      id: this.props.componentId,
      name:this.state.name,
      price:this.state.price,
      description:this.state.description,
      features:this.state.features,
      tags:this.state.tags,
      rating:this.state.newRating,
      review:this.state.review,
      manufacture_name:this.state.manufacture_name,
      category:this.state.category,
    };

    axiosI.patch('/components/auth/',
      data,
      {
        headers: {
          'Authorization': this.state.token
        },
      }
    )
      .then(res => {
        this.setState({
          id: res.data._id.$oid,
          edited: true,
        })
    })
    .catch(e => {
      this.setState({
        edited: false,
      });
      console.log(e);
    });
  }

  deleteComponent = () => {
    let wantToDelete = window.confirm('Are you sure you want to delete?');
    if (wantToDelete) 
    {
      axiosInstance.delete('/components/auth/',
          {
            headers: {
                'Authorization': this.state.token
            },
            params : { "_id":this.props.componentId }, 
          })
        .then(res => {
          alert("Deleted Successfully")
        })
      .catch(e => {
        alert("Failure to Delete")
      });
    }
  }

  render(){
    if (!this.state.isUser) {
      return (<Typography variant="h4" style={{padding: '20px'}}>Please login to edit this component</Typography>)
    }

    if (this.state.edited) {
      return <Redirect to = {{ pathname: "/component/" + this.props.componentId }} />;
    }

    var hasFeatures = (this.state.features.length > 1 || this.state.features[0] != "");
    var hasImage = !(this.state.pictures.length == 0 || this.state.pictures[0] == "");
    var hasDocs = !(this.state.datasheets.length == 0 || this.state.datasheets[0] == "");
    var tagString = this.state.tags.toString();

    return(
      <Container component="main" maxWidth="md">
        <form className={this.props.classes.form} noValidate>
          <Grid container direction="row" justify="center" alignItems="flex-start">
            <Grid container item xs={12} md={6} lg={6} direction="column">
              <Grid item xs={12} className={this.props.classes.image} style={{marginTop: '20px', marginRight: '20px', borderStyle: 'solid', overflow: 'hidden'}}>
              <Carousel autoPlay={false}>
              {hasImage ? (
                this.state.pictures.map((picture, index) => (
                  <Grid item>
                    <img  className={this.props.classes.image} src={`data:image/jpeg;base64,${this.state.imageData[index+1]}`}/>
                    <Button onClick={this.handlePictureDelete} variant="contained" style={{marginTop: '-70px'}} component="label" className={this.props.classes.upload}>
                      Delete this image
                    </Button>
                  </Grid>
                ))) : (<div></div>)}

                </Carousel>
              </Grid>
              <Grid item style={{marginTop: '20px'}}>
                <label for="myfile">
                  <Typography variant="body1">Upload new image:</Typography>
                </label>
                <input type="file" id="myfile" name="myfile" onClick={(e) =>{e.target.value = ''}} onChange={this.handlePictureUpload}/>
              </Grid>

              <Grid container item xs={12} style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <Grid item xs={3}>
                    <Typography>Your rating: </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Rating
                      name="customized-empty"
                      key={`slider-${this.state.rating.avg_rating}`} /* fixed issue */
                      defaultValue={this.state.rating.avg_rating}
                      precision={0.5}
                      value={this.state.newRating}
                      onChange={this.handleRatingChange}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={4} >
                <Grid item xs={6} >
                  <Typography className={this.props.classes.manufacturer} style={{paddingTop: 10}}>
                    Manufacturer:
                  </Typography>
                  <TextField fullWidth id="manufacturer" value={this.state.manufacture_name} onChange={this.handleManufacturerChange} />
                </Grid>
                <Grid item xs={6} >
                  <Typography className={this.props.classes.hardwareCategory} style={{paddingTop: 10}}>
                    Hardware Category:
                  </Typography>
                  <TextField fullWidth id="hardwareCategory" value={this.state.category} onChange={this.handleHardwareCategoryChange} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} lg={6} direction="column" className={this.props.classes.box}>
              <Grid item xs={12}>
                <Typography variant="h3" className={this.props.classes.rating}>
                  <TextField required value={this.state.name} fullWidth id="name" label="Component Name" variant="outlined" name="rating" onChange={this.handleNameChange} autoFocus/>
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <TextField onChange={this.handlePriceChange} margin="normal" value={this.state.price} variant="outlined" required id="price" label="Estimated price"/>
              </Grid>
              <Grid item xs={12} className={this.props.classes.tabs}>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="tabs" indicatorColor="primary"
        textColor="primary">
                  <Tab className={this.props.classes.tab} label="Description" {...a11yProps(0)} />
                  <Tab className={this.props.classes.tab} label="Features" {...a11yProps(1)} />
                  <Tab className={this.props.classes.tab} label="Documents" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={this.state.value} index={0} className={this.props.classes.tabPanel}>
                  <TextField fullWidth multiline value={this.state.description} rows={8} id="description" variant="outlined" label="Description" onChange={this.handleDescriptionChange}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                  <ul>
                    {this.state.features.map((feature, index) => (
                      <li>
                        <Grid container sm={12}>
                          <Grid container sm={8}>
                            <TextField fullWidth id={index} value={this.state.features[index]} label="Feature" onChange={this.handleFeatureChange} />
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
                  {hasDocs ? (
                    this.state.datasheets.map((datasheet, index) => (
                    <ListItem id={index}>
                      <ListItemAvatar>
                        <DescriptionIcon>
                        </DescriptionIcon>
                      </ListItemAvatar>
                      <ListItemText primary={datasheet.filename} />
                        <Link target="_blank" rel="noopener" href={"http://localhost:8000/api/components/file?id=" + datasheet.id.$oid}>
                          Delete
                        </Link>
                    </ListItem>
                  ))) : (<div></div>)}
                  <Grid container sm={12}>
                    <Grid container sm={8}>
                      <label for="myfile"><Typography variant="body1">Upload document:</Typography></label>
                      <input type="file" id="myfile" name="myfile" onClick={(e) =>{e.target.value = ''}} onChange={this.handleDatasheetUpload}/>
                    </Grid>
                  </Grid>
                </List>
                </TabPanel>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className={this.props.classes.tags} style={{paddingTop: 10}}>
                  Tags:
                </Typography>
                <TextField fullWidth id="tag1" value={tagString} multiline label="Enter tags in a comma separated list" onChange={this.handleTagsChange} />
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
                <TextField value={this.state.review} fullWidth id="review" multiline rows={4} variant="outlined" label="Describe your experience" onChange={this.handleReviewChange} />
              </Grid>
              <Grid container item xs={12} justify='flex-end' spacing={3}>
                <Grid item>
                  <Button variant="contained" className={this.props.classes.button} style={{marginTop: '20px'}}>
                    <Typography variant="button" align="center" onClick={this.postComponent} className={this.props.classes.buttonText}>
                      Update Component
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" className={this.props.classes.button} color="secondary" style={{marginTop: '20px'}}>
                    <Typography variant="button" align="center" onClick={this.deleteComponent} className={this.props.classes.buttonText}>
                      Delete Component
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

export default function LaunchEditComponent() {
  return(
    <EditComponent componentId={useParams().componentId} classes={useStyles()} />
  );
}

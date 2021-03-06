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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
      maxHeight: '500px',
      minHeight: '500px',
      maxWidth: '500px',
      maxWidth: '500px',
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
  modal: {
    position: 'absolute',
    width: 400,
    background: theme.palette.common.white,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
      id: this.props.componentId,
      value: 0,
      name:"",
      pictures:[""],
      price:"",
      description:"",
      specifications: [""],
      datasheets:[""],
      tags:[""],
      rating:{},
      review:"",
      manufacture_name:"",
      category:"",
      added: false,
      isUser: false,
      imageData: [""],
      newRating: "5",
    };
    console.log(this.state);
    if (this.state.username == "" || this.state.token == "") {
        this.setState({
          isUser: false,
        });
    }
    else {
        this.state.isUser = true;
    }
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

  handlePictureChange = (e) => {
    this.state.pictures[e.currentTarget.attributes[1].nodeValue] = e.target.files[0];
    this.setState({
      pictures: this.state.pictures
    })
    console.log(this.state);
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleFeatureChange = (e) => {
    this.state.specifications[e.currentTarget.attributes[1].nodeValue] = e.target.value;
    this.setState({
      specifications: this.state.specifications
    })
  }

  handleDatasheetChange = (e) => {
      this.state.datasheets[e.currentTarget.attributes[1].nodeValue] = e.target.files[0];
      this.setState({
        datasheets: this.state.datasheets
      })
      console.log(this.state);
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

  addDatasheetUpload = (e) => {
    this.setState({
      datasheets: this.state.datasheets.concat("")
    })
  }

  addFeature = (e) => {
    this.setState({
      specifications: this.state.specifications.concat("")
    })
  }

  addPictureUpload = (e) => {
    this.setState({
      pictures: this.state.pictures.concat("")
    })
  }


  _handleOpen = (e) => {
    this.setState({
      added: true,
    })
  }

  _handleClose = (e) => {
      this.setState({
        added: false,
      })
  }

  removeFeature(index) {
    var arr = this.state.specifications;
    arr.splice(index, 1);
    this.setState({
      specifications: arr
    })
  }

  removeDocument() {
    var arr = this.state.datasheets;
    arr.pop();
    this.setState({
      datasheets: arr
    })
  }

  removeImage() {
    var arr = this.state.pictures;
    arr.pop();
    this.setState({
      pictures: arr
    })
  }

  postComponent = (event) => {
    if (this.state.tags.length == 0) {
      this.state.tags = [""];
    }

    if (this.state.specifications.length == 0) {
      this.state.specifications = [""];
    }

    event.preventDefault();
    axiosI.post('/components/auth/',
      {
        user: {
          'username' : this.state.username
        },
        name:this.state.name,
        price:this.state.price,
        description:this.state.description,
        specifications:this.state.specifications,
        tags:this.state.tags,
        rating:this.state.newRating,
        review:this.state.review,
        manufacture_name:this.state.manufacture_name,
        category:this.state.category,
      },
      {
        headers: {
          'Authorization': this.state.token
        },
      }
    ).then(res => {
        this.setState({
          id: res.data._id.$oid,
          added: true,
        })
        var types = [1, 2];
        return types.forEach(type => {
          if (type == 1) {
            this.state.pictures.forEach((picture, index) => {
              if (picture != null && picture != "") {
                var formData = new FormData();
                formData.append("id", this.state.id);
                formData.append("pictures", picture);
                axiosI.patch('/components/auth/', formData,  {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': this.state.token
                  }
                }).then(res => {
                  console.log(this.state);
                  console.log(res)
                })
              }
            })
          }
          else {
              this.state.datasheets.forEach((datasheet, index) => {
                if (datasheet != null && datasheet != "") {
                  var formData = new FormData();
                  formData.append("id", this.state.id);
                  formData.append("datasheets", datasheet);
                  this.getData(formData);

                }
              })
          }
        })
    })
    .catch(e => {
      this.setState({
        added: false,
      });
      console.log(e);
    });
  }
  async getData(formData) {
    try {
      let res =
      await axiosI.patch('/components/auth/', formData,  {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': this.state.token
        }
      })
      return res.data;
    }catch(e) {
      console.log(e);
    }
  }

  render(){
    if (!this.state.isUser) {
      return (<Typography variant="h4" style={{padding: '20px'}}>Please login to add a component</Typography>)
    }

    var hasFeatures = (this.state.specifications.length > 1 || this.state.specifications[0] != "");
    var hasImage = !(this.state.pictures.length == 0 || this.state.pictures[0] == "");
    var hasDocs = !(this.state.datasheets.length == 0 || this.state.datasheets[0] == "");
    var tagString = this.state.tags.toString();

    return(
      <Container component="main" maxWidth="md">
        <form className={this.props.classes.form} noValidate>
          <Grid container direction="row" justify="center" alignItems="flex-start">
            <Grid container item xs={12} md={6} lg={6} direction="column">
              <Grid item xs={12}>
                {this.state.pictures.map((picture, index) => (
                    <Grid container sm={12} style={{marginTop: '20px'}}>
                      <Grid container sm={8}>
                        <label for={index}><Typography variant="body1">Upload image:</Typography></label>
                        <input type="file" id={index} name="myfile" onClick={(e) =>{e.target.value = ''}} onChange={this.handlePictureChange}/>
                      </Grid>
                    </Grid>
                ))}

                <Grid item sm={2} style={{marginTop: '-35px', marginLeft: '200px'}}>
                  <IconButton onClick={()=> this.removeImage()} aria-label="delete" style={{color: '#a93838'}}>
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
                  <Button variant="contained" className={this.props.classes.button}  style={{marginTop: '20px', color: "#235a33", paddingLeft: '20px'}} onClick={this.addPictureUpload}>
                    <Typography variant="button" align="center" className={this.props.classes.buttonText}>
                      Add Image
                    </Typography>
                  </Button>
              </Grid>
              <Grid container item xs={12} style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <Grid item xs={3}>
                    <Typography>Your rating: </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Rating
                      name="customized-empty"
                      key={`slider-${this.state.newRating}`} /* fixed issue */
                      defaultValue={5}
                      precision={0.5}
                      value={this.state.newRating}
                      onChange={this.handleRatingChange}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      onChange={this.handleRatingChange}
                    />
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
                  <TextField fullWidth multiline rows={8} id="description" value={this.state.description} variant="outlined" label="Description" onChange={this.handleDescriptionChange}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                  <ul>
                    {this.state.specifications.map((feature, index) => (
                      <li>
                        <Grid container sm={12}>
                          <Grid container sm={8}>
                            <TextField fullWidth id={index}  value={this.state.specifications[index]} label="Feature" onChange={this.handleFeatureChange} />
                          </Grid>
                          <Grid item sm={2} style={{marginTop: '5px'}}>
                            <IconButton onClick={()=> this.removeFeature(index)} aria-label="delete" style={{color: '#a93838'}}>
                              <RemoveCircleIcon />
                            </IconButton>
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
                  <ul>
                    {this.state.datasheets.map((document, index) => (
                      <li>
                        <Grid container sm={12}>
                          <Grid container sm={8}>
                            <label for="myfile"><Typography variant="body1">Upload document:</Typography></label>
                            <input type="file" id={index} name="myfile" onClick={(e) =>{e.target.value = ''}} onChange={this.handleDatasheetChange}/>
                          </Grid>
                        </Grid>
                      </li>
                    ))}
                    <Grid item sm={2} style={{marginTop: '-35px', marginLeft: '200px'}}>
                      <IconButton onClick={()=> this.removeDocument()} aria-label="delete" style={{color: '#a93838'}}>
                        <RemoveCircleIcon />
                      </IconButton>
                    </Grid>
                    <Grid container sm={12}>
                      <Button style={{color: "#235a33", paddingTop: '20px', paddingLeft: '20px', float: 'right'}}/>
                    </Grid>
                      <Button variant="contained" className={this.props.classes.button}  style={{color: "#235a33", paddingLeft: '20px'}} onClick={this.addDatasheetUpload}>
                        <Typography variant="button" align="center" className={this.props.classes.buttonText}>
                          Add document
                        </Typography>
                      </Button>
                  </ul>
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
                    Add Component
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <div>
          <Modal
            open={this.state.added}
            onClose={this._handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={this.props.classes.modal}>
              <Typography variant="h4" id="simple-modal-title">Add component</Typography>
              <Typography variant="body1" style={{paddingBottom: "20px"}} id="simple-modal-description">
                Component added successfully
              </Typography>
              <Grid container sm={12} spacing={3}>
                <Grid item sm={6}>
                  <a href="/add-component/">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={this.props.classes.submit}
                      onClick={this._handleClose}
                    >
                      Add another
                    </Button>
                  </a>
                </Grid>
                <Grid item sm={6}>
                  <a href={"/component/" + this.state.id}><Button
                    fullWidth
                    variant="contained"
                    style={{background: "#918455", color: "#FFF"}}
                    color="primary"
                    className={this.props.classes.submit}
                    onClick={this.deleteAccount}
                  >
                    Go to component page
                  </Button></a>
                  </Grid>
                  </Grid>
            </div>
          </Modal>
        </div>
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

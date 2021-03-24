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
import Carousel from 'react-material-ui-carousel'
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useParams } from 'react-router-dom';
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

class CommentSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Grid container item direction="row" xs={12} className={this.props.classes.commentWrap}>
      <Avatar xs={1}></Avatar>
      <Grid container item direction="column" xs={10} s={11} className={this.props.classes.text}>
        <Grid item className={this.props.classes.username}>
          <Typography variant="body1">
            <b>{this.props.comment.user}</b> <span style={{fontWeight: 100}}>{this.props.comment.created.$date}</span>
          </Typography>
        </Grid>
        <Grid item className={this.props.classes.commentText}>
          <Typography variant="body1">
            {this.props.comment.comment}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    )
  }

}

class ComponentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') ? "Token "+localStorage.getItem('token') : "",
      username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
      user : "",
      pictures : [""],
      rating : {},
      description : "",
      features : [""],
      datasheets : [""],
      name : "",
      price : "",
      keyTerms: [],
      comments: [ { created : { $date : "" } } ],
      manufacture_name:"",
      category:"",
      value:0,
      imageData: [""],
      docData: [""],
      userComment: [''],
      isUser: false,
    }//{value:0, commentValue:""};
    this.handleChange = this.handleChange.bind(this);
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
      // Format comment times
      for (const comment in component.data.comments)
      {
        var date = new Date(component.data.comments[comment].created.$date)
        var halfOfDay = "am";
        var hours = (date.getHours() + 4) % 23
        var minutes = date.getMinutes();
        if(hours > 12) {
          halfOfDay = "pm";
          hours = hours - 12;
        }
        if(minutes < 10)
        {
          minutes = "0"+minutes.toString();
        }
        var formattedDate = hours + ":" + minutes + halfOfDay + " " + (date.getMonth() + 1) +  "-"  + date.getDate() + "-" + date.getFullYear()
        component.data.comments[comment].created.$date = formattedDate;
      }

      if (!component.data.pictures) {
        this.setState({
          pictures: [""],
        })
      }
      else {
          this.setState({
            pictures: component.data.pictures,
          })
      }

      if (!component.data.datasheets) {
        this.setState({
          datasheets: [""],
        })
      }
      else {
          this.setState({
            datasheets: component.data.datasheets,
          })
      }
      // Convert documents object to array
      this.setState(
          {
            user: component.data.who,
            rating: component.data.rating,
            description: component.data.description,
            features: component.data.features,
            name: component.data.name,
            price: component.data.price,
            keyTerms: component.data.tags,
            review: component.data.review,
            comments: component.data.comments,
            manufacture_name: component.data.manufacture_name,
            category: component.data.category,
          }
        );

        return this.state.pictures.forEach((picture, index) => {
          if (picture != "") {
            axiosI.get('/components/file/', {
              params: { "id": picture.id.$oid }
            })
            .then(image => {
              this.setState({
                imageData: this.state.imageData.concat(image.data[0].$binary),
              })
            })
          }
        });
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  _handleDocDownload = (e) => {
    axiosI.get('/components/file/', {
      params: { "id": this.state.datasheets[e.currentTarget.attributes[1].nodeValue].id.$oid }
    })
    .then(doc => {
      return
    })
  }

  handleCommentChange = (e) => {
    this.setState({ userComment: e.target.value });
  }

  postComment = () => {
	if(this.state.username == "" || this.state.token == "")
	{ alert("Must login to comment!"); }
    else {
        axiosI.post('components/auth/comment/', 
          {
            "id": this.props.componentId,
            "comments": this.state.userComment,
            "user": this.state.username
          },
          {
            headers: {
              'Authorization': this.state.token
            }
          }
        )
        .then(doc => {
          window.location.reload();
        })
      }
   }

  render() {
    var isUser = this.state.isUser;

    var hasFeatures = (this.state.features.length > 1 || this.state.features[0] != "");
    var hasImage = !(this.state.pictures.length == 0 || this.state.pictures[0] == "");
    var hasDocs = !(this.state.datasheets.length == 0 || this.state.datasheets[0] == "");
    var hasTags = (this.state.keyTerms.length > 0);

    return(
      <Container component="main" maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start">
          <Grid container item xs={12} md={6} lg={6} direction="column">
            <Grid item xs={12} style={{marginTop: '20px', marginRight: '20px', borderStyle: 'solid'}}>
            <Carousel>
            {hasImage ? (
              this.state.pictures.map((picture, index) => (
                <img  className={this.props.classes.image} src={`data:image/jpeg;base64,${this.state.imageData[index+1]}`}/>
              ))) : (<div></div>)}

              </Carousel>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" className={this.props.classes.rating}>
                Rating: {this.state.rating.avg_rating}/5
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" className={this.props.classes.button}>
                <Typography variant="button" align="center">
                  <a className={this.props.classes.buttonText} href="/experts">Find an Expert</a>
                </Typography>
              </Button>
              {isUser ? (
                <Button variant="contained" className={this.props.classes.button} style={{marginLeft: '20px'}}>
                  <Typography variant="button" align="center">
                    <a className={this.props.classes.buttonText} href={"/edit-component/" + this.props.componentId}>Edit Component</a>
                  </Typography>
                </Button>
              ) : (<div></div>)}

            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} lg={6} direction="column" className={this.props.classes.box}>
            <Grid item xs={12}>
              <Typography variant="h3" className={this.props.classes.rating}>
                {this.state.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={this.props.classes.rating}>
                Estimated Price: ${this.state.price}
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
                {this.state.description}
              </TabPanel>
              <TabPanel value={this.state.value} index={1} className={this.props.classes.tabPanel}>
                <ul>
                  {hasFeatures ? (
                    this.state.features.map((feature, index) => (
                    <li>
                      <Grid container sm={12}>
                        <Grid container sm={8}>
                          <Typography>{feature}</Typography>
                        </Grid>
                      </Grid>
                    </li>
                  ))) : (<div></div>)}
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
                          Download
                        </Link>
                    </ListItem>
                  ))) : (<div></div>)}

                </List>
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              {hasTags ? (
                <Typography variant="body2" className={this.props.classes.keyTerms} style={{paddingTop: 10}}>
                  Key Terms:
                </Typography>) : (<div></div>
              )}
              {hasTags ? (
                this.state.keyTerms.map((term) => (
                  <Button color="secondary"><u>{term}</u></Button>))
                ) : (<div></div>
              )}
            </Grid>
            <Divider variant="middle" />
            <Grid container item md={12} spacing={4} justify="center" >
              <Grid item xs={6} >
                <Typography variant="h6"  className={this.props.classes.manufacturer} style={{paddingTop: 10}}>
                  Manufacturer:
                </Typography>
                <Typography className={this.props.classes.hardwareCategory} style={{paddingTop: 5}}>
                  {this.state.manufacture_name}
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="h6" className={this.props.classes.hardwareCategory} style={{paddingTop: 10}}>
                  Hardware Category:
                </Typography>
                <Typography className={this.props.classes.hardwareCategory} style={{paddingTop: 5}}>
                  {this.state.category}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h5" style={{paddingTop: 20, paddingBottom: 10}}>
              Posted by: {this.state.user}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {this.state.review}
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
                    onChange={this.handleCommentChange}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify='flex-end'>
                <Button variant="contained" className={this.props.classes.button}>
                  <Typography variant="button" align="center" className={this.props.classes.buttonText} onClick={this.postComment}>
                    Post Comment
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            {this.state.comments.map((comment) => (
              <CommentSection comment={comment} classes={this.props.classes} />
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

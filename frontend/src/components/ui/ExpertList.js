import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from "react-router-dom";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import axiosInstance from "../../axiosApi";

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
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
    justifyContent: 'center',
    color: theme.palette.common.teal
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
  filters: {
    maxHeight: '500px'
  },
  filterLabel: {
    fontSize: '1.2rem',
  },
  media: {
    height: 140,
  },
  formControlLabel: {
    fontSize: '0.6rem'
  },
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.secondary.dark,
    }
  },
});

class ExpertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      experts: [],
      role: "",
      universities: [],
      fields: [],
      filters: {
        field: [],
        university: ""
      }
    };
  }

  componentDidMount = (e) => {
    var url = "accounts/";

    axiosInstance.get(url).then(response => {
      console.log(response.data);
      var expertList = response.data.filter(
        function (el) {
          return el.role == "p";
      });
      console.log(expertList);

      this.setState({
        experts: expertList
      });

      var lookup = {};
      var items = expertList;
      var universities = [];

      for (var item, i = 0; item = items[i++];) {
        var name = item.school;
        if (name != "") {
          if (!(name in lookup)) {
            lookup[name] = 1;
            universities.push(name);
          }
        }
      }

      this.setState({
        universities: universities
      });

      lookup = {};
      var fields = [];

      for (var item, i = 0; item = items[i++];) {
        var name = item.field_study;

        if (name != "") {
          if (!(name in lookup)) {
            lookup[name] = 1;
            fields.push(name);
          }
        }
      }

      this.setState({
        fields: fields
      });
    })
    .catch(e => {
      this.setState({

      });
      console.log(e);
    });
  }

  applyFilters = (e) => {
    var url = "accounts/";

    axiosInstance.get(url).then(response => {
      console.log(response.data);
      var expertList = response.data.filter(
        function (el) {
          return (el.role == "p") ;
      });
      console.log(expertList);

      var school = this.state.filters.school;

      if (!(school === undefined || school == ""))
        var expertList = expertList.filter(
          function (el) {
            return (el.school == school) ;
      });
      console.log(expertList);

      var fields = this.state.filters.field;
      var filtered = [];

      if (!(fields === undefined || fields.length == 0)) {
        expertList = expertList.filter(
          function (el) {
            for (var item, i = 0; item = fields[i++];) {
              if (el.field_study == item) {
                filtered.push(el);
              }
            }
            return filtered;
          }
        );
      }
      else {
        filtered = expertList;
      }
      console.log(filtered);

      this.setState({
        experts: filtered
      });
      console.log(this.state)
    })
    .catch(e => {
      this.setState({

      });
      console.log(e);
    });
  }

  _handleSchoolChange = (e) => {
    this.setState({
      filters: {
        school: e.target.value,
        field: this.state.filters.field
      }
    });
  }

  _handleFieldChange = (e) => {
    console.log(e);
    if (e.target.checked == true) {
      var items = [];
      if (!(this.state.filters.field === undefined)){
        items = this.state.filters.field;
      }

      items.push(e.target.value);

      this.setState({
        filters: {
          field: items,
          school: this.state.filters.school
        }
      });
    }
    else {
      var items = this.state.filters.field;
      var newFilter = [];
      var toRemove = e.target.value;

      for (var item, i = 0; item = items[i++];) {
        if (item != toRemove) {
          newFilter.push(item);
        }
      }

      this.setState({
        filters: {
          field: newFilter,
          school: this.state.filters.school
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    const isStudent = (this.state.role == "s");
    console.log(this.state);

    return(
      <Container component="main" maxWidth="lg">
        <Grid item  style={{margin: 50}}>
        </Grid>
        <Grid container item direction="row">
          <Grid container item direction="row" className={classes.filters} xs={12} md={3}>
            <Typography variant="h5" style={{width: '100%'}}>Filters</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">University</InputLabel>
              <Select
                native
                value={this.state.school}
                onChange={this._handleSchoolChange}
                inputProps={{
                  name: 'university',
                }}
              >
                <option aria-label="None" value=""/>
                {this.state.universities.map((university) => (
                  <option value={university}>{university}</option>
                ))}
              </Select>
            </FormControl>
            <Grid item className={classes.filters} xs={6} md={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.filterLabel}>Specialty</FormLabel>
                <FormGroup>
                {this.state.fields.map((field) => (
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="database" />}
                    label={field}
                    value={field}
                    className={classes.option}
                    onChange={this._handleFieldChange}
                  />
                ))}
                </FormGroup>
              </FormControl>
              <Button variant="contained" onClick={this.applyFilters} className={classes.button}>
                Apply Filters
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={8}>
            {this.state.experts.map((expert) => (
              <Card className={classes.root} style={{height: 150, marginBottom: '20px', width: '100%'}}>
                <Button style={{width: '100%'}} component={Link} to={"/profile/" + expert.user.username}>
                    <Grid container item direction="row">
                      <Grid item xs={3}>
                        <img style={{height: 150, width: 150}} src={'http://localhost:8000' + expert.image} />
                      </Grid>
                      <Grid item style={{paddingLeft: '50px'}} xs={9}>
                        <CardMedia
                          title={expert.user.username}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                          {expert.firstname + " " + expert.lastname}
                            <Typography gutterBottom variant="body1">
                              University: {expert.school}
                            </Typography>
                            <Typography gutterBottom variant="body1">
                              Specialty: {expert.field_study}
                            </Typography>
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Button>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(useStyles)(ExpertList)

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
//import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FilterListIcon from '@material-ui/icons/FilterList';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/styles';
import axiosInstance from './../../axiosApi.js';

const axiosI = axiosInstance;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class ComponentBox extends Component {
  constructor(props) {
    super(props);


    this.handleViewComponent = this.handleViewComponent.bind(this);
  }

  handleViewComponent(event) {
    window.location.href = "/component/"+this.props.component._id.$oid;
    event.preventDefault();
  }

  render() {
    return(
      <Grid item md={4}>
      <Card>
        <CardHeader
          title={this.props.component.name}
          titleTypographyProps={{ align: 'center' }}
          className={this.props.classes.cardHeader}
        />
        <CardContent>
          <div className={this.props.classes.cardContent}>
            <Typography variant="subtitle1">
              <b>{this.props.component.picture}</b>
            </Typography>
          </div>
              <Typography variant="subtitle1" align="center">
                Rating:
                <Rating
                  name="read-only"
                  value={this.props.component.rating.avg_rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography variant="subtitle1" align="center">
                Manufacturer: {this.props.component.manufacture_name == undefined ? "N/A" : this.props.component.manufacture_name}
              </Typography>
              <Typography variant="subtitle1" align="center">
                Price: {this.props.component.price == undefined ? "N/A" : "$ "+this.props.component.price}
              </Typography>
              <Typography variant="subtitle1" align="center">
                Hardware Category: {this.props.component.category == undefined ? "N/A" : this.props.component.category}
              </Typography>
              <Typography align="center">
                <Button variant="contained" className={this.props.classes.button} onClick={this.handleViewComponent} color="primary" style={{marginTop: '20px'}}>
                  <Typography variant="button" align="center" className={this.props.classes.buttonText}>
                    View
                  </Typography>
                </Button>
              </Typography>
        </CardContent>
      </Card>
    </Grid>
    )
  }

}

class ComponentGrid extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      components: [],
      manufacturers: [],
      categories: [],
      filters: {
        price:'',
        manufacture_name:'',
        category:'',
        rating:'',
      },
    };
    this.componentDidMount = this.componentDidMount.bind(this);

    this.handleHardwareCategoryChange = this.handleHardwareCategoryChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

 //Filter Functions

handlePriceChange(e) {
    this.state.filters.price = e.target.value
}

handleManufacturerChange(e){
    this.state.filters.manufacture_name= e.target.value
}

handleHardwareCategoryChange = (e) => {
    this.state.filters.category= e.target.value
};

handleRatingChange = (e) => {
    this.state.filters.rating= e.target.value
};

 componentDidMount() {

  var filters = {};
  for (const filter in this.state.filters) {
      if (`${this.state.filters[filter]}` != '') {
          filters[`${filter}`] = this.state.filters[filter];
      }
  }
  filters["name"] = this.props.searchParam;


    axiosI.get('/components/filter', {
      params: filters
    })
    .then(results => {
      var categories = [];
      var manufacturers = [];
      var manlookup = {};
      var catlookup = {};
      for (var component, i = 0; component = results.data[i++];) {
        var man = component.manufacture_name;
        if (man != "") {
          if (!(man in manlookup)) {
            manlookup[man] = 1;
            manufacturers.push(man);
          }
        }
        var cat = component.category;
        if (cat != "") {
          if (!(cat in catlookup)) {
            catlookup[cat] = 1;
            categories.push(cat);
          }
        }
      }
      this.setState({ components: results.data, manufacturers : manufacturers, categories : categories });
    })
    .catch(e => {
        if (e.response.status == 404)
          this.setState({ components: [],manufacturers : [], categories : []  });
        console.log(e);
    })
  }

  render() {
    let comp = this.state.components;

    return(
        <div className={this.props.classes.root}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Typography variant="h5">Results for "{this.props.searchParam}"</Typography>
            </Grid>

            <Grid container item sm={2} spacing={3}>
            <FilterListIcon style={{ padding: 5 }} color="secondary" />
            <Typography variant="h6" component="h3">Filters:</Typography>
            <Button variant="contained" color="secondary" onClick={this.componentDidMount}>
              Apply Filters
            </Button>
              <Grid item sm={12}>
                <FormControl className={this.props.classes.formControl}>
                  <Typography>Manufacturer</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.manufacture_name}
                        onChange={this.handleManufacturerChange}
                      >
                        <MenuItem value={""}>---</MenuItem>
                        {this.state.manufacturers.map((manufacturer) => (
                          <MenuItem value={manufacturer}>{manufacturer}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl className={this.props.classes.formControl}>
                  <Typography>Hardware Category</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.hardwareCategory}
                        onChange={this.handleHardwareCategoryChange}
                      >
                        <MenuItem value={""}>---</MenuItem>
                        {this.state.categories.map((category) => (
                          <MenuItem value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl component="fieldset">
                  <Typography>Price</Typography>
                  <FormGroup>
                    <Typography variant="body2">Less than</Typography>
                    <Input
                      size="small"
                      id="outlined-basic"
                      type="number"
                      variant="outlined"
                      value={this.state.price}
                      onChange={this.handlePriceChange}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={this.state.rating}
                  onChange={this.handleRatingChange}
                  precision={0.5}
                />
              </Box>
            </Grid>

      <Grid container item sm={10} spacing={4}>
        {comp.map((component) => (
            <ComponentBox classes={this.props.classes} component={component} />
        ))}
      </Grid>

          </Grid>
        </div>
    );
  }
}

export default function PassSearchParam() {
  const componentParam = useParams();
  const classes = useStyles()
  return(
    <ComponentGrid searchParam={componentParam.componentName} classes={classes} />
  );
}

//export default withStyles(useStyles)(PassSearchParam)

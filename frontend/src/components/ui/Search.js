import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
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

const useStyles = makeStyles((theme) => ({
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
    //alignItems: 'baseline',
    //backgroundColor: theme.palette.grey[200],
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

export default function SearchResults() {
  const classes = useStyles();
  const { componentName } = useParams();

  //Filter Variables
  const [manufacturer, setManufacturer] = React.useState('');
  const [hardwareCategory, setHardwareCategory] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  //Filter Functions
  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  };

  const handleHardwareCategoryChange = (event) => {
    setHardwareCategory(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  var results = [
    {
    Picture: "Insert Picture",
    Name: "5/10",
    Rating: "Had issues with A on..."
    },
    {
      Picture: "Insert Picture",
      Name: "8/10",
      Rating: "Had issues with B on..."
    },
    {
      Picture: "Insert Picture",
      Name: "7/10",
      Rating: "Had issues with C on..."
    },
    {
      Picture: "Insert Picture",
      Name: "5/10",
      Rating: "Had issues with A on..."
      },
      {
        Picture: "Insert Picture",
        Name: "8/10",
        Rating: "Had issues with B on..."
      },
      {
        Picture: "Insert Picture",
        Name: "7/10",
        Rating: "Had issues with C on..."
      },
      {
        Picture: "Insert Picture",
        Name: "5/10",
        Rating: "Had issues with A on..."
        },
        {
          Picture: "Insert Picture",
          Name: "8/10",
          Rating: "Had issues with B on..."
        },
        {
          Picture: "Insert Picture",
          Name: "7/10",
          Rating: "Had issues with C on..."
        },
  ]
  return(
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={12}><Typography variant="h5">Results for "{componentName}"</Typography></Grid>

        <Grid container item sm={2} spacing={3}>
        <FilterListIcon style={{ padding: 5 }} color="secondary" />
        <Typography variant="h6" component="h3">Filters:</Typography>
          <Grid item sm={12}>
            <FormControl className={classes.formControl}>
              <Typography>Manufacturer</Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={manufacturer}
                    onChange={handleManufacturerChange}
                  >
                    <MenuItem value={"MGM Electronics"}>MGM Electronics</MenuItem>
                    <MenuItem value={"Adaptec"}>Adaptec</MenuItem>
                    <MenuItem value={"Aereo"}>Aereo</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl className={classes.formControl}>
              <Typography>Hardware Category</Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hardwareCategory}
                    onChange={handleHardwareCategoryChange}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Passive"}>Passive</MenuItem>
                    <MenuItem value={"Op Amps"}>Op Amps</MenuItem>
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
                  value={price} 
                  onChange={handlePriceChange} 
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={handleRatingChange}
            />
          </Box>
        </Grid>

        <Grid container item sm={10} spacing={4}>
        {results.map((component) => (
          <Grid item md={4}>
              <Card>
                <CardHeader
                  title={component.Picture}
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="subtitle1">
                      <b>Rating: {component.Name}</b>
                    </Typography>
                  </div>
                      <Typography variant="subtitle1" align="center">
                        {component.Rating}
                      </Typography>
                </CardContent>
              </Card>
          </Grid>
        ))}
        </Grid>
      </Grid>
    </div>
  );
}

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

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
}));


function searchQuery() {
  axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
}

export default function SearchResults() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    opt11: false,
    opt12: false,
    opt13: false,
    opt21: false,
    opt22: false,
    opt23: false,
    opt31: false,
    opt32: false,
    opt33: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { opt11, opt12, opt13, opt21, opt22, opt23, opt31, opt32, opt33  } = state;

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

//render() {
  return(
    <div className={classes.root}>

      <Grid container spacing={3}>
        <Grid item sm={12}><Typography variant="h5">Results for "Component"</Typography></Grid>

        <Grid container item sm={2} spacing={3}>
          <Grid item sm={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Filter Type 1:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={opt11} onChange={handleChange} name="opt11" color="primary"/>}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt12} onChange={handleChange} name="opt12" color="primary"/>}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt13} onChange={handleChange} name="opt13" color="primary"/>}
                label="Option 3"
              />
            </FormGroup>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Filter Type 2:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={opt21} onChange={handleChange} name="opt21" color="primary"/>}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt22} onChange={handleChange} name="opt22" color="primary"/>}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt23} onChange={handleChange} name="opt23" color="primary"/>}
                label="Option 3"
              />
            </FormGroup>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Filter Type 3:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={opt31} onChange={handleChange} name="opt31" color="primary"/>}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt32} onChange={handleChange} name="opt32" color="primary"/>}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt33} onChange={handleChange} name="opt33" color="primary"/>}
                label="Option 3"
              />
            </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item sm={10} spacing={4}>
        <ul>
          <li>Element 1</li>
          <li>Element 2</li>
        </ul>
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
                      Rating: {component.Name}
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
  )
//  }
}

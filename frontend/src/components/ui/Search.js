import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
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

export default function SearchResults() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    opt1: false,
    opt2: false,
    opt3: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { opt1, opt2, opt3 } = state;

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
        <Grid item sm={12}><Typography variant="h5">Results for "Component"</Typography></Grid>

        <Grid container item sm={2} spacing={3}>
          <Grid item sm={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Filter Type 1:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={opt1} onChange={handleChange} name="opt1" />}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt2} onChange={handleChange} name="opt2" />}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt3} onChange={handleChange} name="opt3" />}
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
                control={<Checkbox checked={opt1} onChange={handleChange} name="opt1" />}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt2} onChange={handleChange} name="opt2" />}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt3} onChange={handleChange} name="opt3" />}
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
                control={<Checkbox checked={opt1} onChange={handleChange} name="opt1" />}
                label="Option 1"
              />
              <FormControlLabel
                control={<Checkbox checked={opt2} onChange={handleChange} name="opt2" />}
                label="Option 2"
              />
              <FormControlLabel
                control={<Checkbox checked={opt3} onChange={handleChange} name="opt3" />}
                label="Option 3"
              />
            </FormGroup>
            </FormControl>
          </Grid>
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
}

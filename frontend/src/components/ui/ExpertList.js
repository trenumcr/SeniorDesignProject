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

const useStyles = makeStyles((theme) => ({
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
  filterLabel: {
    fontSize: '1.2rem',
  },
  media: {
    height: 140,
  },
  formControlLabel: {
    fontSize: '0.6rem'
  }
}));

var experts = [
  {
  name: "Dr. Smith",
  university: "University of Cincinnati",
  specialty: "Embedded Systems",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget..."
  },
  {
  name: "Dr. Johnson",
  university: "University of Kentucky",
  specialty: "Databases",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget..."
  },
  {
  name: "Dr. Brown",
  university: "University of Cincinnati",
  specialty: "Software",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget..."
  },
  {
  name: "Dr. Davis",
  university: "Xavier University",
  specialty: "Embedded Systems",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget..."
  },
]

var universities = [
  {
    name: "University of Cincinnati",
    id: 1,
  },
  {
    name: "University of Kentucky",
    id: 2,
  },
  {
    name: "Xavier University",
    id: 3,
  },
]

export default function ExpertList() {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    uc: true,
    uk: false,
    xu: false,
    database: false,
    embedded: false,
    software: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { uc, uk, xu, database, embedded, software } = state;

  return(
    <Container component="main" maxWidth="lg">
      <Grid container item direction="row">
        <Grid container item direction="column" xs={3} >

        </Grid>
        <Grid container item direction="column"  xs={9} spacing={3}>
          <Grid container direction="row" alignItems="flex-start" style={{paddingTop: 40}}>
            <Grid item>
              <Typography variant="h5">
                Search for an Expert
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  component={Link} to="/search-component"
                  color="primary"
                />
              </div>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              Showing results for ...
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item  style={{margin: 10}}>
        <Divider />
      </Grid>
      <Grid container item direction="row">
        <Grid container item direction="row" xs={12} md={3}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">University</InputLabel>
            <Select
              native
              value={state.university}
              onChange={handleChange}
              inputProps={{
                name: 'university',
              }}
            >
              <option aria-label="None" value="" />
              {universities.map((university) => (
                <option value={university.id}>{university.name}</option>
              ))}
            </Select>
          </FormControl>
          <Grid item className={classes.filters} xs={6} md={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.filterLabel}>Specialty</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="secondary" checked={database} onChange={handleChange} name="database" />}
                  label="Databases"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" checked={embedded} onChange={handleChange} name="embedded" />}
                  label="Embedded Systems"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" checked={software} onChange={handleChange} name="software" />}
                  label="Software"
                  className={classes.option}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={8}>
          {experts.map((expert) => (
            <Card className={classes.root} style={{height: 150, marginBottom: '20px', width: '100%'}}>
              <CardActionArea>
                <Grid container item direction="row">
                  <Grid item xs={3} style={{height: 100, width: 100, backgroundColor: '#eee'}}>
                  </Grid>
                  <Grid item  xs={9}>
                    <CardMedia
                      title={expert.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {expert.name}
                        <Typography gutterBottom variant="body1">
                          University: {expert.university} {expert.specialty}
                        </Typography>
                        <Typography gutterBottom variant="body1">
                          Specialty: {expert.specialty}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" component={Link} to="/expert-profile">
                  Contact
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

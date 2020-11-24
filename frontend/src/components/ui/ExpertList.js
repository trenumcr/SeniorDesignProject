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
}));

export default function ExpertList() {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = React.useState({
    uc: true,
    uk: false,
    xu: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { uc, uk, xu } = state;

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
        <Grid container item direction="column" xs={3}>
          <Grid item className={classes.filters}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.filterLabel}>University</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uc} onChange={handleChange} name="uc" />}
                  label="University of Cincinnati"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uk} onChange={handleChange} name="uk" />}
                  label="University of Kentucky"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={xu} onChange={handleChange} name="xu" />}
                  label="Xavier University"
                  className={classes.option}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item className={classes.filters}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.filterLabel}>University</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uc} onChange={handleChange} name="uc" />}
                  label="University of Cincinnati"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uk} onChange={handleChange} name="uk" />}
                  label="University of Kentucky"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={xu} onChange={handleChange} name="xu" />}
                  label="Xavier University"
                  className={classes.option}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item className={classes.filters}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.filterLabel}>University</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uc} onChange={handleChange} name="uc" />}
                  label="University of Cincinnati"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={uk} onChange={handleChange} name="uk" />}
                  label="University of Kentucky"
                  className={classes.option}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={xu} onChange={handleChange} name="xu" />}
                  label="Xavier University"
                  className={classes.option}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid container item xs={8}>
          <Card className={classes.root} style={{height: 150}}>
            <CardActionArea>
              <Grid container item direction="row">
                <Grid item xs={3} style={{height: 100, width: 100, backgroundColor: '#eee'}}>
                </Grid>
                <Grid item  xs={9}>
                  <CardMedia
                    title="Dr. Smith"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Dr. Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Contact
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.root} style={{height: 150}}>
            <CardActionArea>
              <Grid container item direction="row">
                <Grid item xs={3} style={{height: 100, width: 100, backgroundColor: '#eee'}}>
                </Grid>
                <Grid item  xs={9}>
                  <CardMedia
                    title="Dr. Smith"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Dr. Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Contact
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.root} style={{height: 150}}>
            <CardActionArea>
              <Grid container item direction="row">
                <Grid item xs={3} style={{height: 100, width: 100, backgroundColor: '#eee'}}>
                </Grid>
                <Grid item  xs={9}>
                  <CardMedia
                    title="Dr. Smith"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Dr. Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Contact
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.root} style={{height: 150}}>
            <CardActionArea>
              <Grid container item direction="row">
                <Grid item xs={3} style={{height: 100, width: 100, backgroundColor: '#eee'}}>
                </Grid>
                <Grid item xs={9}>
                  <CardMedia
                    title="Dr. Smith"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Dr. Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex felis, sodales et commodo sed, ultrices a nisi. Proin eget.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Contact
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

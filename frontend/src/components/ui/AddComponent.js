import React from 'react';

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
    backgroundColor: '#e5e5e5',
    width: '100%',
    paddingTop: '100%',
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
  '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
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
}));

export default function AddComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [commentValue, commentSetValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <Container component="main" maxWidth="md">
      <form className={classes.form} noValidate>
        <Grid container direction="row" justify="center" alignItems="flex-start">
          <Grid container item xs={12} md={6} lg={6} direction="column">
            <Grid item xs={12} className={classes.image}>
              <Button variant="contained" component="label" className={classes.upload}>
                Upload Image
                <input type="file" hidden/>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.rating}>
                Your Rating:
                <TextField margin="normal" required id="rating" label="rating" name="rating"/>/10
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} lg={6} direction="column" className={classes.box}>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.rating}>
                <TextField required fullWidth id="name" label="Component Name" name="rating" autoFocus/>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.rating}>
                Estimated Price: <TextField margin="normal" required id="price" label="Price"/>
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.tabs}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs" indicatorColor="primary"
      textColor="primary">
                <Tab className={classes.tab} label="Description" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Features" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Documents" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <TextField fullWidth id="description" label="Description"/>
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                <ul>
                  <li>
                    <TextField fullWidth id="feature1" label="Feature"/>
                  </li>
                  <li>
                    <TextField fullWidth id="feature2" label="Feature"/>
                  </li>
                  <li>
                    <TextField fullWidth id="feature3" label="Feature"/>
                  </li>
                </ul>
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.tabPanel}>
                <List className={classes.root}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar><DescriptionIcon/></Avatar>
                    </ListItemAvatar>
                    <Button variant="contained" component="label" className={classes.upload}>
                      Upload Refrence Sheet
                      <input type="file" hidden/>
                    </Button>
                    <ListItemText/>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar><ImageIcon/></Avatar>
                    </ListItemAvatar>
                    <Button variant="contained" component="label" className={classes.upload}>
                      Upload Additional Images
                      <input type="file" hidden/>
                    </Button>
                    <ListItemText/>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar><PictureAsPdfIcon/></Avatar>
                    </ListItemAvatar>
                    <Button variant="contained" component="label" className={classes.upload}>
                      Upload Additional Documents
                      <input type="file" hidden/>
                    </Button>
                    <ListItemText/>
                  </ListItem>
                </List>
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className={classes.keyTerms} style={{paddingTop: 10}}>
                Tags:
              </Typography>
              <TextField fullWidth id="tag1" label="Enter tags in a comma separated list"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="body1">

            </Typography>
          </Grid>
          <Grid container item direction="column" xs={12} className={classes.comments}>
            <Divider variant="middle" style={{marginTop: 20}}/>
            <Grid item xs={12}>
              <Typography variant="h4" style={{paddingTop: 20, paddingBottom: 10}}>
                Your Review:
              </Typography>
              <TextField fullWidth id="review" label="Describe your experience"/>
            </Grid>
            <Grid container item xs={12} justify='flex-end'>
              <Button variant="contained" className={classes.button}>
                <Typography variant="button" align="center" className={classes.buttonText}>
                  Post Component
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

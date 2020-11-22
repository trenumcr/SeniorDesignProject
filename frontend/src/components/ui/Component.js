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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  commentWrap: {
    paddingBottom: 50,
  },
}));

export default function Component() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <Container component="main" maxWidth="md">
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid container item xs={12} md={6} lg={6} direction="column">
          <Grid item xs={12} className={classes.image}>

          </Grid>
          <Grid item xs={12}>
            <h2>Rating: x/10</h2>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Find an Expert
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} lg={6} direction="column" className={classes.box}>
          <Grid item xs={12}>
            <h1><b>Component Name</b></h1>
          </Grid>
          <Grid item xs={12}>
            <h3>Estimated Price: $00.00 - $00.00</h3>
          </Grid>
          <Grid item xs={12} className={classes.tabs}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs" indicatorColor="primary"
    textColor="primary">
              <Tab className={classes.tab} label="Description" {...a11yProps(0)} />
              <Tab className={classes.tab} label="Features" {...a11yProps(1)} />
              <Tab className={classes.tab} label="Documents" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.tabPanel}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis mi sit amet purus rhoncus, sed eleifend neque imperdiet. Integer at nisl et erat venenatis fermentum non eu lectus. Donec ut tortor iaculis, consectetur est vel, venenatis elit. Sed at ultrices mi. Aliquam sed justo magna. Nulla accumsan nec nisi sed ullamcorper. Suspendisse et velit fermentum, interdum ante et, consequat ipsum. Sed ullamcorper lectus in egestas dignissim. Nullam sodales in sapien viverra convallis. Integer mauris lorem, scelerisque a consectetur sit amet, faucibus nec dui.
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabPanel}>
              <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
              </ul>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.tabPanel}>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="User Submitted Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PictureAsPdfIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Data sheet" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Other Documentation" secondary="July 20, 2014" />
                </ListItem>
              </List>
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            Key Terms:
            <Button color="primary"><u>Type</u></Button>
            <Button color="primary"><u>Voltage</u></Button>
            <Button color="primary"><u>Power</u></Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="flex-start">
        <Grid item xs={12}>
          <h3>Posted by: User</h3>
        </Grid>
        <Grid item xs={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum arcu quis turpis gravida convallis. Nam sit amet convallis velit, vel pellentesque arcu. Fusce eget ex at lacus pretium blandit a non magna. Nam ac massa ante. Aliquam et nibh metus. Suspendisse maximus, ex quis tempor congue, neque elit luctus turpis, vitae ultricies leo tellus in magna. Aliquam quis ante molestie, tempus augue eget, blandit sapien. Vivamus volutpat elit tortor, at varius diam porta eu. Nullam fermentum velit quam, ornare ornare urna commodo a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sit amet sem lectus. Proin dictum quam metus, vitae luctus felis luctus ac. Etiam dictum risus eu lacus accumsan faucibus.
        </Grid>
        <Grid container item direction="column" xs={12} className={classes.comments}>
          <Grid item xs={12}>
            <h2>Comments</h2>
          </Grid>
          <Grid container item direction="row" xs={12} className={classes.commentWrap}>
            <Avatar xs={1}></Avatar>
            <Grid container item direction="column" xs={11} className={classes.text}>
              <Grid item className={classes.username}>
                <b>UserName</b> 2 months ago
              </Grid>
              <Grid item className={classes.commentText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum arcu quis turpis gravida convallis. Nam sit amet convallis velit, vel pellentesque arcu. Fusce eget ex at lacus pretium blandit a non magna. Nam ac massa ante. Aliquam et nibh metus.
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} className={classes.commentWrap}>
            <Avatar xs={1}></Avatar>
            <Grid container item direction="column" xs={11} className={classes.text}>
              <Grid item className={classes.username}>
                <b>UserName</b> 3 months ago
              </Grid>
              <Grid item className={classes.commentText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum arcu quis turpis gravida convallis. Nam sit amet convallis velit, vel pellentesque arcu. Fusce eget ex at lacus pretium blandit a non magna. Nam ac massa ante. Aliquam et nibh metus.
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} className={classes.commentWrap}>
            <Avatar xs={1}></Avatar>
            <Grid container item direction="column" xs={11} className={classes.text}>
              <Grid item className={classes.username}>
                <b>UserName</b> 5 months ago
              </Grid>
              <Grid item className={classes.commentText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum arcu quis turpis gravida convallis. Nam sit amet convallis velit, vel pellentesque arcu. Fusce eget ex at lacus pretium blandit a non magna. Nam ac massa ante. Aliquam et nibh metus.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

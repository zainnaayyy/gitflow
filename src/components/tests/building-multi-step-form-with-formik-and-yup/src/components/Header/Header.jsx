import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

export default function Header() {
  // const classes = "";

  return (
    // <AppBar position="absolute" color="default" className={classes.appBar}>
    <AppBar position="absolute" color="default" >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Company name
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

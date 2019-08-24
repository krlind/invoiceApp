import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withRouter } from 'react-router-dom'

// import Modal from '../modal/modal';
// import useModal from '../../hooks/hooks';


const useStyles = makeStyles(theme => ({

  profile:{
    marginLeft: 'auto'
  }
  
}))

function NavDropDown(props) {
  const classes = useStyles(); 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  // const {isShowing, toggle} = useModal();

  //Functions for profile 
  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  // const displayModalTest = () => {
  //   console.log('hello')
  //   console.log(isShowing, toggle)
  //   return (
  //     <div className="modal">
  //     <button className="button-default" onClick={toggle}>Show Modal</button>
  //     <Modal
  //       isShowing={isShowing}
  //       hide={toggle}
  //     />
  //   </div>
  //   )
  // }

  const logOut = (event) => {
    window.localStorage.clear()
    props.history.push("/login")
  
  }


  return (      
    <div className={classes.profile}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open2}
        onClose={handleClose}
      >
        
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={()=> props.toggle}>Change Company Settings</MenuItem>
        <MenuItem onClick={logOut}>Log Out</MenuItem>
      </Menu>
    </div>

  );
}

export default withRouter(NavDropDown)
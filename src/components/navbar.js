import PropTypes from 'prop-types'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

export default function Navbar(props) {
  const auth=true;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className="my-3">
            {props.title}
          </Typography>
          {auth && (
            <div>
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              </Menu>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string

}

Navbar.defaultProps = {
    aboutText: "About Text here"
}
import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddBox from '@mui/icons-material/AddBox';

function Header(props) {

  return (
  <div>
    <header className="bar_header" id="Header">
      <div className="area_header">
        <div className="text_header">
          <Link to="/" id="link">Mocktail Drinks For Relaxed</Link>
        </div>
        <Link to="/uploadmock" >
        <IconButton aria-label="add to shopping cart" size="large" sx={{mt:0.2, color: '#fff'}} id="addicon">
        <AddBox sx={{color: "#fff"}}fontSize="inherit"/>
      </IconButton>
      </Link>
      </div>
    </header>
      <div className="sub-header"></div>
</div>
  );
}

export default Header;
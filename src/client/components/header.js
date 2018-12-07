import React from 'react';
import img from '../assets/images/busscanner-w.png';

const Header = () => (
  <div className="row pt-3">
    <div className="col-12 col-md-12">
      <img src={img} alt="logo" width={180} />
    </div>
  </div>
);

export default Header;

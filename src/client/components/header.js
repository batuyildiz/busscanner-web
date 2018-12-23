import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img from '../assets/images/busscanner-w.png';

const Header = (props) => {
  const { resetData } = props;
  return (
    <Link to="/" onClick={resetData} className="row pt-3">
      <div className="col-12 col-md-12">
        <img src={img} alt="logo" width={180} />
      </div>
    </Link>
  );
};

Header.propTypes = {
  resetData: PropTypes.func.isRequired,
};

export default Header;

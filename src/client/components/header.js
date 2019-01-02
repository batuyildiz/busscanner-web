import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Collapse } from '@material-ui/core';
import img from '../assets/images/busscanner-w.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContact: false,
    };
  }

  handleContactClick() {
    this.setState(state => ({ showContact: !state.showContact }));
  }

  render() {
    const { showContact } = this.state;
    const { resetData } = this.props;
    return (
      <div>
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" onClick={resetData}>
              <img src={img} alt="logo" width={180} />
            </Link>
          </div>
          <div className="header-nav">
            <Button
              onClick={() => this.handleContactClick()}
              style={{ padding: '0 10px' }}
            >
              Contact Us
            </Button>
          </div>
        </div>
        <Collapse in={showContact}>
          <div className="header-contact">
            contact@busscanner.net
          </div>
        </Collapse>
      </div>
    );
  }
}

Header.propTypes = {
  resetData: PropTypes.func.isRequired,
};

export default Header;

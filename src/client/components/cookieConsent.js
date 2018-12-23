import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './reusables/button';

class CookieConsent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
    };
  }
  render() {
    const { hide } = this.state;
    const hasConsentBefore = !!sessionStorage.getItem('bsContent');
    if (hasConsentBefore || hide) {
      return (<div />);
    }
    return (
      <div className="cookie-consent">
        <div>
          By using our site, you acknowledge that you have read and understand our
          <Link to="/cookie"> Cookie Policy</Link>
          ,
          <Link to="/privacy"> Privacy Policy</Link>
          , and our
          <Link to="/tos"> Terms of Service</Link>
          .
        </div>
        <Button
          classes={{ button: 'btnClass' }}
          text="Agree"
          onClick={() => {
            this.setState({ hide: true });
            sessionStorage.setItem('bsContent', true);
          }}
          width="100px"
        />
      </div>
    );
  };
}

export default CookieConsent;

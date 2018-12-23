import React from 'react';
import { Link } from 'react-router-dom';
import Button from './reusables/button';

const CookieConsent = () => {
  const hasConsentBefore = !!sessionStorage.getItem('bsContent');
  if (hasConsentBefore) {
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
          sessionStorage.setItem('bsContent', true);
        }}
        width="100px"
      />
    </div>
  );
};

export default CookieConsent;

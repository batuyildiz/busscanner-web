import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { resetData } from '../actions/homeActionCreators';


const styles = {
  inputGroupStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  inputGroupStyleMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pipeStyle: {
    height: '30px',
    margin: '15px 15px 0px 15px',
    border: '0.5px solid #949494',
  },
  filterBg: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 27px 0 rgba(0, 0, 0, .13)',
    borderRadius: '8px',
  },
  titleText: {
    color: '#949494',
    fontFamily: 'Open Sans, Arial, Sans Serif',
    fontSize: '24px',
    textAlign: 'center',
    width: '100%',
  },
};

const policyContent = {
  privacy: {
    title: 'Privacy Policy',
    text: '<p>Your privacy is important to us. It is BusScanner\'s policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://busscanner.net">https://busscanner.net</a>, and other sites we own and operate.</p>\n'
      + '<p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>\n'
      + '<p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>\n'
      + '<p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>\n'
      + '<p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>\n'
      + '<p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>\n'
      + '<p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>\n'
      + '<p>This policy is effective as of 1 December 2018.</p>\n',
  },
  tos: {
    title: 'Terms Of Service',
    text: '<h4>1. Terms</h4>\n'
      + '<p>By accessing the website at <a href="https://busscanner.net">https://busscanner.net</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>\n'
      + '<h4>2. Use License</h4>\n'
      + '<ol type="a">\n'
      + '   <li>Permission is granted to temporarily download one copy of the materials (information or software) on BusScanner\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n'
      + '   <ol type="i">\n'
      + '       <li>modify or copy the materials;</li>\n'
      + '       <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>\n'
      + '       <li>attempt to decompile or reverse engineer any software contained on BusScanner\'s website;</li>\n'
      + '       <li>remove any copyright or other proprietary notations from the materials; or</li>\n'
      + '       <li>transfer the materials to another person or "mirror" the materials on any other server.</li>\n'
      + '   </ol>\n'
      + '    </li>\n'
      + '   <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by BusScanner at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>\n'
      + '</ol>\n'
      + '<h4>3. Disclaimer</h4>\n'
      + '<ol type="a">\n'
      + '   <li>The materials on BusScanner\'s website are provided on an \'as is\' basis. BusScanner makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>\n'
      + '   <li>Further, BusScanner does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>\n'
      + '</ol>\n'
      + '<h4>4. Limitations</h4>\n'
      + '<p>In no event shall BusScanner or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BusScanner\'s website, even if BusScanner or a BusScanner authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>\n'
      + '<h4>5. Accuracy of materials</h4>\n'
      + '<p>The materials appearing on BusScanner\'s website could include technical, typographical, or photographic errors. BusScanner does not warrant that any of the materials on its website are accurate, complete or current. BusScanner may make changes to the materials contained on its website at any time without notice. However BusScanner does not make any commitment to update the materials.</p>\n'
      + '<h4>6. Links</h4>\n'
      + '<p>BusScanner has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BusScanner of the site. Use of any such linked website is at the user\'s own risk.</p>\n'
      + '<h4>7. Modifications</h4>\n'
      + '<p>BusScanner may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>\n'
      + '<h4>8. Governing Law</h4>\n'
      + '<p>These terms and conditions are governed by and construed in accordance with the laws of Europe and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>\n',
  },
  cookie: {
    title: 'Cookie Policy',
    text: '<p>This is the Cookie Policy for BusScanner, accessible from https://www.busscanner.net/</p>\n'
      + '<p><strong>What Are Cookies</strong></p>\n'
      + '\n'
      + '<p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or \'break\' certain elements of the sites functionality.</p>\n'
      + '\n'
      + '<p>For more general information on cookies see the Wikipedia article on HTTP Cookies.</p>\n'
      + '\n'
      + '<p><strong>How We Use Cookies</strong></p>\n'
      + '\n'
      + '<p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>\n'
      + '\n'
      + '<p><strong>Disabling Cookies</strong></p>\n'
      + '\n'
      + '<p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>\n'
      + '\n'
      + '<p>You can learn how to manage cookies on your web browser by following the <a href="https://privacypolicies.com/blog/browser-cookies-guide/">Browser Cookies Guide</a>.</p>\n'
      + '\n'
      + '<p><strong>The Cookies We Set</strong></p>\n'
      + '\n'
      + '<ul>\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '<li>\n'
      + '    <p>Forms related cookies</p>\n'
      + '    <p>When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>\n'
      + '</li>\n'
      + '\n'
      + '<li>\n'
      + '    <p>Site preferences cookies</p>\n'
      + '    <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>\n'
      + '</li>\n'
      + '\n'
      + '</ul>\n'
      + '\n'
      + '<p><strong>Third Party Cookies</strong></p>\n'
      + '\n'
      + '<p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>\n'
      + '\n'
      + '<ul>\n'
      + '\n'
      + '<li>\n'
      + '    <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>\n'
      + '    <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>\n'
      + '</li>\n'
      + '\n'
      + '\n'
      + '\n'
      + '<li>\n'
      + '    <p>As we sell products it\'s important for us to understand statistics about how many of the visitors to our site actually make a purchase and as such this is the kind of data that these cookies will track. This is important to you as it means that we can accurately make business predictions that allow us to monitor our advertising and product costs to ensure the best possible price.</p>\n'
      + '</li>\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '\n'
      + '</ul>\n'
      + '\n'
      + '<p><strong>More Information</strong></p>\n'
      + '\n'
      + '<p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren\'t sure whether you need or not it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Generator of <a href="https://cookiepolicygenerator.com">GDPR Cookies Policy</a>.</p>\n'
      + '\n'
      + '<p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>\n'
      + '\n'
      + '<ul>\n'
      + '<li>Email: contact@busscanner.net</li>\n'
      + '\n'
      + '</ul>\n',
  }
};


const PolicyPage = (props) => {
  const { type, resetHome } = props;
  const { title, text } = policyContent[type];
  return (
    <div className="container" style={{ marginBottom: '30px' }}>
      <div className="bg">
        <Header resetData={() => resetHome()} />
        <div className="row mt-5 policyContainer">
          <div className="col-lg-12" style={styles.filterBg}>
            <div className="row pt-4">
              <div
                className="titleText"
                style={styles.titleText}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </div>
            <div className="policyText" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
      </div>
    </div>
  );
};

PolicyPage.propTypes = {
  type: PropTypes.string.isRequired,
  resetHome: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    resetHome: () => {
      dispatch(resetData());
    }
  };
}

export default connect(null, mapDispatchToProps)(PolicyPage);

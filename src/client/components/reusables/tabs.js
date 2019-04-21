import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    marginBottom: '10px'
  },
});

class TabsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  componentDidMount() {
    this.setState({ value: 0 });
  }

  handleChange = (event, value) => {
    const { handleTabsChange } = this.props;
    handleTabsChange(value);
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };


  render() {
    const { value } = this.state;
    const { tabs, theme, classes } = this.props;
    return (
      <div className="tabContainer">
        <AppBar position="static" color="default" className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            { tabs.map((tab, index) => (<Tab key={`tab_${index}`} label={tab.label} icon={(<Icon>{tab.icon}</Icon>)} />))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
          style={{ overflow: 'hidden' }}
        >
          { tabs.map(tab => (tab.content))}
        </SwipeableViews>
      </div>
    );
  }
}

TabsContainer.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  theme: PropTypes.object.isRequired,
  handleTabsChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TabsContainer);

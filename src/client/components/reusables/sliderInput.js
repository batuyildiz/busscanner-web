import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 167,
  },
  slider: {
    padding: '20px 0px',
  },
};

class StepSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 15,
    };
  }

  handleChange(event, value) {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  }

  render() {
    const { classes, label } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' }}>
          {label}
          <span style={{ float: 'right' }}>
            {`${value}€`}
          </span>
        </div>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={5}
          max={100}
          step={5}
          onChange={(e, v) => this.handleChange(e, v)}
        />
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(StepSlider);

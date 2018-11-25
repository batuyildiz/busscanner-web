import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function ContainedButtons(props) {
  const { classes, onClick, text, width } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={() => onClick()}
      style={{ width }}
    >
      {text}
    </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(ContainedButtons);

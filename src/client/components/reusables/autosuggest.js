import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {}, ref, ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion) {
  return (
    <MenuItem component="div">
      <div>
        <span>
          {suggestion.name}
        </span>
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  root: {
    // flexGrow: 1,
  },
  container: {
    marginTop: 16,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    // display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class AutoSuggest extends React.Component {
  state = {
    single: '',
  };

  getSuggestionValue = (suggestion) => {
    const { onSelect } = this.props;
    onSelect(suggestion.flix_id);
    return suggestion.name;
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const { getSuggestions } = this.props;
    getSuggestions(value);
  };

  handleSuggestionsClearRequested = () => {

  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { single } = this.state;
    const { classes, suggestions, label } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion,
    };

    return (
      <FormControl className={classes.root}>
        <InputLabel shrink>
          {label}
        </InputLabel>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Start Typing',
            value: single,
            onChange: this.handleChange('single'),
            inputRef: (node) => {
              this.popperNode = node;
            },
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)} placement="bottom-start">
              <Paper
                square
                {...options.containerProps}
                style={{
                  width: this.popperNode ? this.popperNode.clientWidth : null,
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
      </FormControl>
    );
  }
}

AutoSuggest.propTypes = {
  getSuggestions: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(AutoSuggest);

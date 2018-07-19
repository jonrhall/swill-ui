import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

class SearchField extends React.Component {
  static styles = theme => ({
    textField: {
      marginRight: theme.spacing.unit,
      width: 300
    }
  })

  static propTypes = {
    classes: PropTypes.shape({
      textField: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  render() {
    const { classes, onChange, value } = this.props;
    return (
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <SearchIcon color="action" />
        </Grid>
        <Grid item>
          <TextField
            label="Search plugins"
            type="search"
            className={classes.textField}
            margin="none"
            value={value}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(SearchField.styles)(SearchField);

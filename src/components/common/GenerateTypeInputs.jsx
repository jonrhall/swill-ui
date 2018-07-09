import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class GenerateTypeInputs extends React.Component {
  static propTypes = {
    type: PropTypes.shape({}).isRequired,
    values: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      noContent: PropTypes.string,
      gridContainer: PropTypes.string,
      numField: PropTypes.string,
      alignCenter: PropTypes.string
    }).isRequired
  }

  static styles = theme => ({
    noContent: {
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit + 4,
      marginTop: theme.spacing.unit
    },
    gridContainer: {
      marginTop: theme.spacing.unit
    },
    numField: {
      width: '100%'
    },
    alignCenter: {
      textAlign: 'center'
    }
  })

  handleChange = prop => (event) => {
    this.props.onChange({ [prop]: event.target.value });
  }

  render() {
    const { type, values } = this.props;
    return (

      <Grid container spacing={24} className={this.props.classes.gridContainer}>
        {type.properties.length > 0 ?
          type.properties.map((prop) => {
            if (prop.type === 'number') {
              return (
                <Grid item xs={6} key={prop.name}>
                  <TextField
                    id="input-with-icon-grid"
                    type="number"
                    label={prop.label}
                    helperText={prop.description}
                    value={values[prop.name]}
                    onChange={this.handleChange(prop.name)}
                    className={this.props.classes.numField}
                    inputProps={{ className: this.props.classes.alignCenter }}
                  />
                </Grid>
              );
            }

            if (prop.type === 'select') {
              return (
                <Grid item xs={6} key={prop.name}>
                  <FormControl>
                    <InputLabel htmlFor="type-input-select">{prop.label}</InputLabel>
                    <Select
                      value={`${values[prop.name]}`}
                      onChange={this.handleChange(prop.name)}
                      inputProps={{ name: prop.name, id: 'type-input-select' }}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {prop.options.map(option => (
                        <MenuItem value={`${option}`} key={option}>{`${option}`}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{prop.description}</FormHelperText>
                  </FormControl>
                </Grid>
              );
            }

            // TODO: Add more input types

            return null;
          }) :
          <Typography variant="caption" className={this.props.classes.noContent}>
            No config associated with this type.
          </Typography> }
      </Grid>
    );
  }
}

export default withStyles(GenerateTypeInputs.styles)(GenerateTypeInputs);

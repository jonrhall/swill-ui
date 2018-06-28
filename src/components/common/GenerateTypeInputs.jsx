import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

class GenerateTypeInputs extends React.Component {
  handleChange = prop => (event) => {
    this.props.onChange({ [prop]: event.target.value });
  }

  render() {
    const { type, values } = this.props;
    return (
      <div style={{ marginTop: '24px' }}>
        {type.properties.length > 0 ?
          type.properties.map((prop) => {
            if (prop.type === 'number') {
              return (
                <TextField
                  id="input-with-icon-grid"
                  type="number"
                  label={prop.label}
                  helperText={prop.description}
                  value={values[prop.name]}
                  onChange={this.handleChange(prop.name)}
                  key={prop.name}
                  style={{ width: 120 }}
                />
              );
            }

            return null;
          }) :
          <Typography variant="caption">No config associated with this type.</Typography> }
      </div>
    );
  }
}

GenerateTypeInputs.propTypes = {
  type: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};

export default GenerateTypeInputs;

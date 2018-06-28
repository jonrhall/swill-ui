import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  menuContent: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 3,
    outline: 0,
    width: '280px'
  },
  sliderInput: {
    position: 'relative',
    top: '4px'
  },
  textInput: { width: '80px' },
  description: { marginTop: '10px' },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    outline: 0
  },
  button: {
    fontWeight: 'bold'
  },
  textTransform: {
    textTransform: 'none'
  }
});

class EditRangeCell extends React.Component {
  state = {
    anchorEl: null,
    modalValue: this.props.value
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      modalValue: this.props.value
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleChange = (event) => {
    const { lowRange, highRange } = this.props;
    let val = parseInt((event.target.value ? event.target.value : 0), 10);

    if (val < lowRange) {
      val = lowRange;
    } else if (val > highRange) {
      val = highRange;
    }

    this.setState({
      modalValue: parseInt(val, 10)
    });
  };

  handleSliderChange = (event, modalValue) => {
    this.setState({ modalValue });
  };

  saveChange = () => {
    if (this.props.value !== this.state.modalValue) {
      this.props.onChange(this.state.modalValue);
    }

    this.handleClose();
  };

  render() {
    const { anchorEl, modalValue } = this.state;

    return (
      <TableCell>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <Typography className={this.props.classes.textTransform}>
            {this.props.value}
          </Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={this.props.classes.menuContent}>
            <Typography id="range-label" variant="caption">Edit range</Typography>
            <Grid container spacing={24}>
              <Grid item xs={8}>
                <Slider
                  value={modalValue}
                  min={this.props.lowRange}
                  max={this.props.highRange}
                  step={1}
                  aria-labelledby="range-label"
                  onChange={(e, val) => this.setState({ modalValue: val })}
                  style={{ position: 'relative', top: '4px' }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="input-with-icon-grid"
                  type="number"
                  margin="dense"
                  value={modalValue}
                  onChange={this.handleChange}
                  className={this.props.classes.textInput}
                />
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              className={this.props.classes.description}
            >
              {this.props.label}
            </Typography>
          </div>
          <div className={this.props.classes.actionButtons}>
            <Button
              color="secondary"
              className={this.props.classes.button}
              onClick={this.saveChange}
            >
              Save
            </Button>
          </div>
        </Menu>
      </TableCell>
    );
  }
}

EditRangeCell.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  highRange: PropTypes.number.isRequired,
  lowRange: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    menuContent: PropTypes.string,
    sliderInput: PropTypes.string,
    textInput: PropTypes.string,
    description: PropTypes.string,
    actionButtons: PropTypes.string,
    button: PropTypes.string,
    textTransform: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(EditRangeCell);

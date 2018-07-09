import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';

import MenuActionButtons from './MenuActionButtons';
import TableCellButton from './TableCellButton';

class EditRangeCell extends React.Component {
  static styles = theme => ({
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
    textInput: {
      width: '80px',
      textAlign: 'center !important'
    },
    description: { marginTop: theme.spacing.unit },
    alignCenter: {
      textAlign: 'center'
    }
  })

  static propTypes = {
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
      alignCenter: PropTypes.string
    }).isRequired
  }

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
    const {
      anchorEl,
      modalValue
    } = this.state;
    const {
      classes,
      lowRange,
      highRange,
      value,
      label
    } = this.props;
    return (
      <TableCell>
        <TableCellButton
          anchor={!!anchorEl}
          buttonText={value.toString()}
          onClick={this.handleOpen}
          menuName="edit-range-cell"
        />
        <Menu
          id="edit-range-cell"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className={classes.menuContent}>
            <Typography id="range-label" variant="caption">Edit range</Typography>
            <Grid container spacing={24}>
              <Grid item xs={8}>
                <Slider
                  value={modalValue}
                  min={lowRange}
                  max={highRange}
                  step={1}
                  aria-labelledby="range-label"
                  onChange={this.handleSliderChange}
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
                  className={classes.textInput}
                  inputProps={{ className: classes.alignCenter }}
                />
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              className={classes.description}
            >
              {label}
            </Typography>
          </div>
          <MenuActionButtons onSave={this.saveChange} onCancel={this.handleClose} />
        </Menu>
      </TableCell>
    );
  }
}

export default withStyles(EditRangeCell.styles)(EditRangeCell);

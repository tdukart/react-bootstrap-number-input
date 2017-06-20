import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import noop from 'no-op';

export default class NumberInput extends React.Component {
  static get propTypes() {
    return {
      value: PropTypes.number.isRequired,
      onChange: PropTypes.func,
      min: PropTypes.number,
      max: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      onChange: noop,
      min: 0,
      max: Infinity,
    };
  }

  render() {
    const makeValidValue = ( value ) => {
      let validValue = parseInt( value, 10 );
      if ( validValue < this.props.min ) {
        validValue = this.props.min;
      } else if ( validValue > this.props.max ) {
        validValue = this.props.max;
      }
      return validValue;
    };

    const handleTextChange = ( event ) => {
      let value = makeValidValue( event.target.value );
      this.props.onChange( value );
    };

    const handleKeyPress = ( event ) => {
      let key = event.keyCode || event.key;

      switch ( key ) {
        case 38: // Up
          addValue();
          return false;
        case 40: // Down
          subtractValue();
          return false;
      }

      // Don't need to handle non-numeric keypresses, as handleTextChange will pass it to makeValidValue and reject the change.
    };

    const addValue = ( event ) => {
      let value = makeValidValue( this.props.value + 1 );
      this.props.onChange( value );
    };

    const subtractValue = ( event ) => {
      let value = makeValidValue( this.props.value - 1 );
      this.props.onChange( value );
    };

    return (
      <InputGroup>
        <FormControl
          type="number"
          value={this.props.value}
          onKeyUp={handleKeyPress}
          onChange={handleTextChange}
        />
        <InputGroup.Button>
          <Button onClick={addValue}>
            <Glyphicon glyph="chevron-up"/>
          </Button>
          <Button onClick={subtractValue}>
            <Glyphicon glyph="chevron-down"/>
          </Button>
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

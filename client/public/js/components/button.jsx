import React from 'react';

require('../../css/button.scss');

function Button(props) {
  const disabledClass = props.disabled ? 'disabled' : '';
  const typeClass = props.type ? props.type : '';
  const activeClass = props.active ? 'active' : '';
  const errorClass = props.error ? 'error' : '';
  const throbClass = props.throb ? 'throb' : '';

  return (
    <button
      className={`button ${disabledClass} ${typeClass} ${activeClass} ${errorClass} ${throbClass}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  active: false,
  error: false,
  children: null,
  disabled: false,
  onClick: null,
  type: null,
  throb: false,
};

Button.propTypes = {
  active: React.PropTypes.bool,
  error: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string,
  throb: React.PropTypes.bool,
};

export default Button;

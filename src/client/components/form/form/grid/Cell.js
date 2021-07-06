import React from 'react';

const Cell = ({ children, style, width }) => (
  <div className="cell" style={{ width, ...style }}>
    {children}
  </div>);

Cell.defaultProps = {
  width: '100%',
  style: {
    marginTop: 8,
    marginBottom: 8,
    paddingRight: 4,
    paddingLeft: 4,
  },
};

export default Cell;

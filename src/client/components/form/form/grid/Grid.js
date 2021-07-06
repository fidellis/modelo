import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
};
const Grid = ({ children, style }) => (
  <div className="grid" style={{ ...style, ...styles.container }}>
    {children}
  </div>);

Grid.defaultProps = {};

export default Grid;

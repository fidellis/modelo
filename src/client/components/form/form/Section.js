import React from 'react';

function getStyle(style) {
  return {
    container: {
      border: '1px solid rgba(0,0,0,0.125)',
      borderRadius: 4,
      background: '#FFF',
      marginBottom: 16,
      ...style.container
    },
    header: {
      padding: 20,
      borderBottom: '1px solid rgba(0,0,0,0.125)',
      color: '#212529',
      fontSize: 15,
      ...style.header
    },
    body: {
      padding: 20,
      ...style.body
    },
  }
};

const Section = ({ children, title, style, ...props }) => {
  const styles = getStyle(style);
  return (
    <div style={styles.container}>
      <div style={styles.header}>{title}</div>
      <div style={styles.body}>
        {children}
      </div>
    </div>
  )
};

Section.defaultProps = {
  style: {}
};

export default Section;

import React from 'react';

const styles = {
  container: {
    border: '1px solid rgba(0,0,0,0.125)',
    borderRadius: 4,
    background: '#FFF',
    marginBottom: 16,
  },
  header: {
    padding: 20,
    borderBottom: '1px solid rgba(0,0,0,0.125)',
    color: '#212529',
    fontSize: 15,
  },
  body: {
    padding: 20,
  },


};
const Section = ({ children, title, ...props }) => (
  <div style={styles.container}>
    <div style={styles.header}>{title}</div>
    <div style={styles.body}>
      {children}
    </div>
  </div>
);

Section.defaultProps = {
};

export default Section;

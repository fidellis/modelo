import React from 'react';

const styles = {
  container: {
    border: '1px solid rgba(0,0,0,0.125)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    background: '#FFF',
    marginBottom: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 11,
    // borderBottom: '1px solid rgba(0,0,0,0.125)',
    // color: '#212529',
    // color: '#878787',
    fontSize: 16,
    background: '#f1f1f1',
    color: '#666666',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 20,
  },
  footer: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  actions: {
    width: '40%',
    display: 'flex',
    justifyContent: 'end',
  }

};
const Section = ({ children, title, footer, actions, ...props }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <div>{title}</div>
      <div style={styles.actions}>{actions.map(action => action)}</div>
    </div>
    <div style={styles.body}>
      {children}
    </div>
    {footer &&
      <div style={styles.footer}>
        {footer}
      </div>}
  </div>
);

Section.defaultProps = {
  actions: [],
};

export default Section;

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Toolbar from './Toolbar';
import MenuBar from './MenuBar';
import Main from './Main';
import './Nav.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const { children, routes, pages, ...props } = this.props;
    const page = pages.find(p => p.path === props.location.pathname) || {};

    return (
      <div className="nav-container">
        <Toolbar {...props} />
        <MenuBar {...props} routes={routes} />
        <Main page={page}>{children}</Main>
      </div>
    );
  }
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
};

export default withRouter(Nav);

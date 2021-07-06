import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import './Nav.scss';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getItems(itens) {
    if (!itens) return null;
    return (
      <article>
        <div className="coluna">
          {itens.filter(r => r.link !== false).map(({ subitens, ...item }) => (
            <div className="item">
              <label>{item.label}</label>
              <ul>
                {subitens && subitens.filter(r => r.link !== false).map(({ path, Component, ...subitem }) => (
                  <li>
                    <a onClick={() => (Component ? this.props.history.push(path) : path ? window.open(path) : null)}>{subitem.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>);
  }

  getSubitens(itens, label) {
    if (!itens) return null;

    if (isMobile) {
      return (<section className="section-itens section-mobile">
        {itens}
      </section>);
    }

    return (<section className="section-itens section-web">
      <header>{label}</header>
      {itens}
    </section>);
  }

  renderItem(route) {
    const { icon, path, label, Component } = route;
    const itens = this.getItems(route.itens);
    return (
      <li>
        <a onClick={() => (!itens && Component && path ? this.props.history.push(path) : null)}>
          <i className="material-icons icon">{icon}</i>
          <div className="label">
            <div>{label}</div>
            {itens && !isMobile && <i className="material-icons">chevron_right</i>}
          </div>
        </a>
        {this.getSubitens(itens, label)}
      </li>
    );
  }

  render() {
    const { routes } = this.props;
    return (
      <div>
        <div id="nav">
          <ul>
            {routes.filter(r => r.link !== false).map(route => this.renderItem(route))}
          </ul>
        </div>
      </div>
    );
  }
}

MenuBar.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default MenuBar;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Analytics from '~/components/analytics/Analytics';
import Snackbar from '~/components/message/Snackbar';
import Expirado from '~/components/message/Expirado';
import Nav from '~/components/nav/Nav';
import Header from '~/components/nav/Header';
import PrivateComponent from '~/components/PrivateComponent';
import RibbonEnv from '~/components/misc/RibbonEnv';
import { buscaUsuarioLogado, buscaAcessos } from '~/store/app';
import api from '~/lib/api';
import routes, { getPages } from './routes';
import './styles/app.scss';

const pages = getPages();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.usuario) {
      this.props.buscaUsuarioLogado();
    }

    if (!this.props.acessos.length) {
      this.props.buscaAcessos();
    }

  }

  render() {
    const { usuario, baseUrl, location, mensagens, erros, expirado, acessos, history } = this.props;
    if (!usuario || expirado) { return (<Expirado expirado />); }

    return (

      <Nav
        usuario={usuario}
        baseUrl={baseUrl}
        routes={routes}
        pages={pages}
      >

        <RibbonEnv />

        <Analytics
          history={history}
        />

        <Snackbar
          mensagens={mensagens}
          erros={erros}
        />

        <section>
          <Switch key={location.key}>
            {pages.map(({ Component, allow, ...routeProps }) => (
              <Route
                {...routeProps}
                location={location}
                render={props => (
                  <div>
                    <Header {...routeProps} />
                    {routeProps.tabs && <routeProps.tabs />}
                    <div className="app-container">
                      <PrivateComponent
                        {...routeProps}
                        {...this.props}
                        {...props}
                        component={Component}
                        usuario={usuario}
                        acessos={acessos}
                        allow={allow}
                      />
                    </div>
                  </div>
                )}
              />
            ))}
          </Switch>
        </section>
      </Nav>

    );
  }
}


App.defaultProps = {
  expirado: false,
};

App.propTypes = {
  usuario: PropTypes.object.isRequired,
  acessos: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  mensagens: PropTypes.array.isRequired,
  erros: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  expirado: PropTypes.bool,
  buscaUsuarioLogado: PropTypes.func.isRequired,
  buscaAcessos: PropTypes.func.isRequired,
};


const mapStateToProps = ({ app: { usuario, acessos, mensagens, erros, expirado } }) => ({ usuario, mensagens, erros, expirado, acessos });
export default withRouter(connect(mapStateToProps, { buscaUsuarioLogado, buscaAcessos })(App));

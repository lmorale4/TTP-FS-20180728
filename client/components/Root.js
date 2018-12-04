import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { getTickers } from '../store/tickers';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { UserForm } from './User';
import { Home, Transactions } from './Portfolio';
import Navbar from './Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#e8e7e7',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class Root extends Component {
  componentDidMount() {
    this.props.getTickers();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar />
            <main>
              <Switch>
                <Route exact path="/signup" component={UserForm} />
                <Route exact path="/login" component={UserForm} />
                {isLoggedIn && (
                  <Switch>
                    <Redirect exact from="/portfolio" to="/" />
                    <Route exact path="/" component={Home} />
                    <Route
                      exact
                      path="/transactions"
                      component={Transactions}
                    />
                  </Switch>
                )}
                <Route component={UserForm} />
              </Switch>
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  getTickers: () => dispatch(getTickers()),
});

export default connect(
  mapState,
  mapDispatch
)(Root);

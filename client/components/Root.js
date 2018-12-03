import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { UserForm, Portfolio } from './User';
import Navbar from './Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Root = props => {
  const { isLoggedIn } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Navbar />
          <main>
            <Switch>
              <Route path="/signup" component={UserForm} />
              <Route path="/login" component={UserForm} />
              {isLoggedIn && (
                <Switch>
                  <Redirect exact from="/portfolio" to="/" />
                  <Route path="/" component={Portfolio} />
                </Switch>
              )}
              <Route component={UserForm} />
            </Switch>
          </main>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

export default connect(mapState)(Root);

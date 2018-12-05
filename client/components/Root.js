import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTickers } from '../store/tickers';
import { me } from '../store/user';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from './Routes';
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
    status: {
      bad: '#f8d7da',
      ok: '#e8e7e7',
      good: '#d4edda',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class Root extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar />
            <Routes />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapState = state => ({
  error: state.error,
});

const mapDispatch = dispatch => ({
  loadData: async () => {
    await dispatch(me());
    await dispatch(getTickers());
  },
});

export default connect(
  mapState,
  mapDispatch
)(Root);

import React from 'react';

import { TextField } from '@material-ui/core';

const Login = props => {
  const { email, password, handleChange } = props;
  return (
    <div>
      <TextField
        label="Email"
        name="email"
        value={email}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        fullWidth
        onChange={handleChange}
      />
    </div>
  );
};

export default Login;

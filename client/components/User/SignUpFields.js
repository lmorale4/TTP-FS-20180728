import React from 'react';

import { TextField } from '@material-ui/core';

const SignUpFrom = props => {
  const { firstName, lastName, handleChange } = props;
  return (
    <div>
      <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        fullWidth
        onChange={handleChange}
      />
    </div>
  );
};

export default SignUpFrom;

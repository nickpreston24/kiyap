/**
 * Credit to nero2009
 * Original Source: https://codesandbox.io/s/ol11mmk30z
 */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

export const Form = props => {
  const {
    values: { name, email, password, confirmPassword },
    errors,
    touched,
    // handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    console.log(errors);
    setFieldTouched(name, true, false);
  };
  return (
    <form
      onSubmit={() => {
        alert("submitted");
      }}
    >
      <TextField
        id="name"
        name="name"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        label="Name"
        value={name}
        onChange={change.bind(null, "name")}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="email"
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        label="Email"
        fullWidth
        value={email}
        onChange={change.bind(null, "email")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="password"
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={change.bind(null, "password")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        label="Confirm Password"
        fullWidth
        type="password"
        value={confirmPassword}
        onChange={change.bind(null, "confirmPassword")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
};

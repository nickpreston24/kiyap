import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    width: "300px",
    margin: "0 auto",
    textTransform: "uppercase",
    padding: "20px 30px",
    alignSelf: "center",
  },
});


class Tag extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Button color="primary" raised={true} classes={{ root: classes.button }} />
    );
  }
}

export default withStyles(styles)(Tag);
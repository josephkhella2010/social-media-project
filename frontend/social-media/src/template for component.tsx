import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  container: {
    backgroundColor: "yellow",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center"
  }
});

export default function exemple() {
  const classes = useStyles();

  return <div className={classes.container}></div>;
}

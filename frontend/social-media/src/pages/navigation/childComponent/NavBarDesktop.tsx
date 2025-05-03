import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
const useStyles = createUseStyles({
  navBarSection: {
    backgroundColor: "#decedd",
    width: "100%",
    height: "60px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid gray",
    position: "fixed",
    top: "0px",
    zIndex: "1000",
    "& img": {
      width: "50px",
      height: "50px"
    }
  },

  btnContainer: {
    padding: "20px",
    display: "flex",
    gap: "20px",

    "& button": {
      padding: "10px 12px",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
      backgroundColor: "#ec6868",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        backgroundColor: "#ff3737"
      }
    }
  }
});

export default function NavBarDesktop() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.navBarSection}>
      <img
        src="/fotos/chatLogo.jpg"
        alt="logo foto"
        onClick={() => navigate("/")}
      />

      <div className={classes.btnContainer}>
        <button onClick={() => navigate("/login")}>Login </button>
        <button onClick={() => navigate("/register")}>Register </button>
      </div>
    </div>
  );
}

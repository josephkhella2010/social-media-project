import React, { useEffect, useState } from "react";
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
  hamburgContainer: {
    width: "50px",
    height: "50px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& div": {
      width: "30px",
      height: "3px",
      backgroundColor: "white",
      borderRadius: "10px",
      transition: "transform 0.3s ease, opacity 0.2s ease"
    }
  },
  open: {
    "& div:nth-of-type(1)": {
      transform: "translateY(9px) rotate(45deg)"
    },
    "& div:nth-of-type(2)": {
      transform: "translateY(-9px) rotate(-45deg)"
    }
  },
  SideMenu: {
    zIndex: "1000",

    position: "Fixed",
    backgroundColor: "#00000066",
    top: 60,
    width: "100%",
    height: "100%",
    left: "100%",
    transition: "left 0.2s linear",
    overflow: "hidden"
  },
  btnContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#c0b0bf",
    left: "100%",
    transition: "left 0.25s linear",
    height: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
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
  },
  openSideMenu: {
    left: "0%"
  }
});

export default function MobileNavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useStyles();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const onClosed = () => {
    setIsOpen(false);
  };
  return (
    <div className={classes.navBarSection}>
      <img
        src="/fotos/chatLogo.jpg"
        alt="logo foto"
        onClick={() => navigate("/")}
      />
      <div
        className={`${classes.hamburgContainer} ${isOpen ? classes.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
      </div>

      <div
        className={`${classes.SideMenu} ${isOpen ? classes.openSideMenu : ""}`}>
        <div
          className={`${classes.btnContainer} ${
            isOpen ? classes.openSideMenu : ""
          }`}>
          <button
            onClick={() => {
              navigate("/");
              onClosed();
            }}>
            Home
          </button>
          <button
            onClick={() => {
              navigate("/login");
              onClosed();
            }}>
            Login{" "}
          </button>
          <button
            onClick={() => {
              navigate("/register");
              onClosed();
            }}>
            Register{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

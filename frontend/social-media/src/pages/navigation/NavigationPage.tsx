import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import MobileNavBar from "./childComponent/mobileNavBar";
import NavBarDesktop from "./childComponent/NavBarDesktop";
const useStyles = createUseStyles({
  navBarMainWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  navBarWrapper: {
    width: "100%",
    maxWidth: "2000px"
  }
});

export default function NavigationPage() {
  const classes = useStyles();
  const [isWidth, setIsWidth] = useState<boolean>(false);
  useEffect(() => {
    const handelResize = () => {
      if (window.innerWidth <= 500) {
        setIsWidth(true);
      } else {
        setIsWidth(false);
      }
    };
    handelResize();
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, [isWidth]);

  return (
    <div className={classes.navBarMainWrapper}>
      <div className={classes.navBarWrapper}>
        {isWidth ? <MobileNavBar /> : <NavBarDesktop />}
      </div>
    </div>
  );
}

import React from "react";
import { createUseStyles } from "react-jss";
import HomePageSection from "./ChildComponent/HomePageSection";
const useStyles = createUseStyles({
  HomePageMainWrapper: {
    minHeight: "100dvh",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  HomePageWrapper: {
    minHeight: "100dvh",
    width: "100%",
    maxWidth: "2000px"
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.HomePageMainWrapper}>
      <div className={classes.HomePageWrapper}>
        <HomePageSection />
      </div>
    </div>
  );
}

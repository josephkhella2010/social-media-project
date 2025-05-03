import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { imgsArrType } from "../../helps/interfacesType";
import { useNavigate } from "react-router-dom";
const useStyles = createUseStyles({
  container: {
    backgroundColor: "#E9D8FF",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "100px",
    padding: "0px 0px 100px 0px",
    marginTop: "60px",
    "@media (max-width: 650px)": {
      gap: "50px"
    }
  },
  header: {
    color: "#c8001a",
    fontSize: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    boxSizing: "border-box",
    "@media (max-width: 650px)": {
      marginTop: "50px",
      textAlign: "center",
      fontSize: "30px",
      padding: "10px 15px"
    }
  },
  firstSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3EAFF",
    minHeight: "200px",
    padding: "50px 20px",
    "& h1": {
      color: "#c8001a",
      width: "50%",
      fontSize: "48px",
      "@media (max-width: 650px)": {
        width: "100%",
        textAlign: "center",
        fontSize: "30px"
      }
    },
    "@media (max-width: 650px)": {
      flexDirection: "column",
      gap: "30px"
    }
  },
  imgsContainer: {
    width: "50%",
    position: "relative",
    height: "300px",
    "@media (max-width: 650px)": {
      width: "90%"
    }
  },
  imgsSection: {
    position: "absolute",
    top: "0",
    left: "0",
    opacity: "0",
    transition: "opacity 1s linear",
    width: "100%",
    height: "300px",
    "& img": {
      objectFit: "contain",
      width: "100%",
      height: "100%"
    },
    "@media (max-width: 650px)": {
      flexDirection: "column"
    }
  },
  showFoto: {
    opacity: 1
  },
  secondSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3EAFF",
    minHeight: "200px",
    padding: "50px 20px",

    "@media (max-width: 650px)": {
      flexDirection: "column-reverse"
    }
  },
  secondSectionText: {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "20px",
    width: "85%",
    "& button": {
      width: "150px",
      padding: "10px",
      borderRadius: "20px",
      border: "1px solid black",
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#E9D8FF",
        border: "none",
        color: "#c8001a"
      },
      "@media (max-width: 650px)": {
        width: "80%",
        textAlign: "center",
        fontSize: "20px",
        justifySelf: "center"
      }
    },
    "& h1": {
      width: "50%",
      fontSize: "30px",
      "@media (max-width: 1000px)": {
        width: "75%"
      },
      "@media (max-width: 650px)": {
        width: "100%",
        textAlign: "center",
        fontSize: "20px"
      }
    },
    "& p": {
      "@media (max-width: 650px)": {
        width: "100%",
        textAlign: "center"
      }
    }
  },
  secondSectionImgsContainer: {
    width: "50%",
    height: "300px",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain"
    }
  }
});

export default function HomePageSection() {
  const classes = useStyles();
  const naviate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imgsArr: imgsArrType[] = [
    { name: "one", url: "/fotos/homeFoto/chatOne.jpg" },
    { name: "two", url: "/fotos/homeFoto/chatTwo.jpg" },
    { name: "three", url: "/fotos/homeFoto/chatThree.jpg" },
    { name: "four", url: "/fotos/homeFoto/chatFour.jpg" },
    { name: "five", url: "/fotos/homeFoto/chatFive.jpg" }
  ];
  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === imgsArr.length - 1 ? 0 : prev + 1));
    }, 4000);
  }, [currentIndex, imgsArr.length]);
  return (
    <div className={classes.container}>
      <h1 className={classes.header}> Welcome to connect Friends</h1>
      <div className={classes.firstSection}>
        <h1>Safe to start chatting here.</h1>
        <div className={classes.imgsContainer}>
          {imgsArr &&
            imgsArr.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${classes.imgsSection}
              ${currentIndex === index ? classes.showFoto : ""}
              `}>
                  <img src={item.url} alt={item.name} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={classes.secondSection}>
        <div className={classes.secondSectionText}>
          <h1>
            Chat with your friends who you know them from a long time ago.
          </h1>
          <p>Just here to chat? No problem. Ready to settle down? Go hard.</p>
          <p>Plus, you can know new friend anyTime.</p>
          <button onClick={() => naviate("/register")}> Register</button>
        </div>
        <div className={classes.secondSectionImgsContainer}>
          <img
            src="/fotos/homeFoto/secondContainer.webp"
            alt="second Container"
          />
        </div>
      </div>
    </div>
  );
}

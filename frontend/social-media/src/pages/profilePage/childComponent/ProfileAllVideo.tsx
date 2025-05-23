import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  deleteMedia,
  fetchDelete,
  fetchMedia
} from "../../../sliceReducer/mediaSlice";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "100%",
    padding: "20px 50px 20px 20px",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "20px 30px 20px 5px"
    },
    "& h1": {
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  videoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyContent: "center",
    gap: "20px",

    alignItems: "center",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  },

  centerVideo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    width: "100%"
  },
  video: {
    width: "90%",
    justifySelf: "center",
    "@media (max-width: 600px)": {
      width: "80%",
      justifySelf: "center"
    }
  },
  centerVideoItem: {
    width: "70%"
  },
  mainImgContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
    "& button": {
      width: "150px",
      height: "40px",
      border: "none",
      cursor: "pointer",
      color: "white",
      backgroundColor: "#ec6868",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "capitalize",
      transition: "transform 0.3s linear",
      "&:hover": {
        transform: "scale(1.1)"
      }
    }
  },
  confirmationContainer: {
    backgroundColor: "#0000006e",
    width: "100vw",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "60px",
    left: "0px"
  },
  confirmationSection: {
    backgroundColor: "white",
    width: "50%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: "10px",
    padding: "20px 10px",
    gap: "30px",
    "& button": {
      height: "40px",
      padding: "10px 15px",
      border: "none",
      cursor: "pointer",
      color: "white",
      backgroundColor: "black",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "capitalize",
      transition: "transform 0.3s linear",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        transform: "scale(1.1)"
      },
      "@media (max-width: 750px)": {
        fontSize: "16px"
      }
    },
    "@media (max-width: 850px)": {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    "@media (max-width: 750px)": {
      width: "90%",
      fontSize: "10px"
    }
  }
});

export default function ProfileAllVideo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [imgId, setImgId] = useState<number | null>(null);
  const allMedia = useSelector((state: RootState) => state.media.mediaList);
  const videoMedia = allMedia.filter((item) => item.filetype.includes("video"));

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  const handleDelete = () => {
    try {
      if (confirm) {
        dispatch(fetchDelete(imgId));
        dispatch(deleteMedia(imgId));
        setConfirm(false);
      }
    } catch (error) {
      console.error("Error deleting media:", error); // Fix: Log full error details
    }
  };

  return (
    <div className={classes.container}>
      <h1>All videos</h1>
      <div
        className={
          videoMedia.length === 1 ? classes.centerVideo : classes.videoSection
        }>
        {videoMedia.length > 0 ? (
          videoMedia.map((item, index) => {
            return (
              <div key={index} className={classes.mainImgContainer}>
                <video
                  controls
                  key={index}
                  className={
                    videoMedia.length === 1
                      ? classes.centerVideoItem
                      : classes.video
                  }>
                  <source
                    src={`http://localhost:5002${item.mediaUrl}`}
                    type={item.filetype}
                  />
                </video>
                <button
                  onClick={() => {
                    setConfirm(true);
                    setImgId(item.id);
                  }}>
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <h2>There are no videos</h2>
        )}
        {confirm && (
          <div className={classes.confirmationContainer}>
            <div className={classes.confirmationSection}>
              <button onClick={() => handleDelete()}>
                Are u sure to delete foto
              </button>
              <button onClick={() => setConfirm(false)}>cancel </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

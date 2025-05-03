import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
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
    padding: "20px",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "20px 5px"
    },
    "& h1": {
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  imgSection: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  },

  centerImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "20px"
  },
  img: {
    width: "90%",
    justifySelf: "center",
    height: "200px",
    "@media (max-width: 600px)": {
      width: "80%",
      justifySelf: "center"
    }
  },
  centerImgItem: {
    width: "70%",
    height: "200px"
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

export default function ProfileAllImages() {
  const classes = useStyles();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [imgId, setImgId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const allData = useSelector((state: RootState) => state.media.mediaList);
  const filterImg = allData.filter((item) => item.filetype.includes("image"));
  //console.log(filterImg);
  const FetchData = () => {
    dispatch(fetchMedia());
  };
  useEffect(() => {
    FetchData();
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
      <h1>All Images</h1>
      <div
        className={
          filterImg.length === 1 ? classes.centerImg : classes.imgSection
        }>
        {filterImg.length > 0 ? (
          filterImg.map((item, index) => {
            return (
              <div key={index} className={classes.mainImgContainer}>
                <img
                  className={
                    filterImg.length === 1 ? classes.centerImgItem : classes.img
                  }
                  src={`http://localhost:5002${item.mediaUrl}`}
                  alt={item.filetype}
                />
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
          <h2>There are no Images</h2>
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

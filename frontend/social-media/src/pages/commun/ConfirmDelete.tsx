import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
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
interface PropsType {
  confirm: boolean;
  setConfirm: (value: boolean) => void;
  handleDelete: () => void;
}

export default function ConfirmDelete({
  confirm,
  setConfirm,
  handleDelete
}: PropsType) {
  const classes = useStyles();

  return (
    confirm && (
      <div className={classes.confirmationContainer}>
        <div className={classes.confirmationSection}>
          <button onClick={() => handleDelete()}>Are u sure to delete</button>
          <button onClick={() => setConfirm(false)}>cancel </button>
        </div>
      </div>
    )
  );
}

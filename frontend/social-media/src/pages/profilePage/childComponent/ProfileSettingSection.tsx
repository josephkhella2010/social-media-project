import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { setTheme } from "../../../sliceReducer/themeSlice";
import { useEffect, useState } from "react";
import { getUsersRequest } from "../../../sliceReducer/userInformationSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../commun/ConfirmDelete";
import { ToastContainer, toast } from "react-toastify";
const useStyles = createUseStyles({
  settingContainer: {
    borderRadius: "8px",
    width: "100%",
    height: "100dvh",
    "& h1": {
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "30px",
      textTransform: "capitalize"
    }
  },
  themeSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    boxSizing: "border-box",
    maxWidth: "700px",
    gap: "20px",

    "@media (max-width: 670px)": {
      gap: "10px",
      padding: "20px 0px"
    },
    "& p": {
      width: "fit-content",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "17px !important",

      "@media (max-width: 670px)": {
        fontSize: "10px !important"
      }
    }
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "@media (max-width: 670px)": {
      gap: "30px"
    }
  },
  slideBtnContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "@media (max-width: 670px)": {
      flexDirection: "column-reverse"
    },
    "& span": {
      "@media (max-width: 670px)": {
        fontSize: "10px"
      }
    }
  },
  slideBtn: {
    width: "70px",
    height: "30px",
    backgroundColor: "white",
    border: "1px solid gray",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    padding: "5px",
    boxSizing: "border-box",
    position: "relative",
    "@media (max-width: 670px)": {
      width: "50px",
      height: "20px"
    }
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "black",
    transition: "right 0.2s linear",
    position: "absolute",
    "@media (max-width: 670px)": {
      width: "10px",
      height: "10px"
    }
  },
  move: {
    right: "5px",
    "@media (max-width: 670px)": {
      right: "5px"
    }
  },
  turn: {
    right: "45px",
    "@media (max-width: 670px)": {
      right: "35px"
    }
  }
});

export default function ProfileSettingSection() {
  const classes = useStyles();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [confirm, setConfirm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);
  const users = useSelector(
    (state: RootState) => state.usersInformation.userInformation
  );
  const userInfo = useSelector(
    (state: RootState) => state.loginInformation.user
  );
  const storageTheme = JSON.parse(localStorage.getItem("theme") || `""`);
  const changePosition = storageTheme === "light" ? classes.move : classes.turn;
  function handleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", JSON.stringify(newTheme));
    dispatch(setTheme(newTheme));
  }

  const FilterUser = users.find(
    (person) => person.firstName === userInfo?.firstName
  );
  const id = String(FilterUser?.id);
  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!id) {
        console.log("User not found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5002/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("successfully deleted Account");
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      console.log(response.data.msg);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting user:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className={classes.settingContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>setting page</h1>
      <div className={classes.mainContainer}>
        <div className={classes.themeSection} onClick={handleTheme}>
          <p>change color Theme</p>
          <div className={classes.slideBtnContainer}>
            {storageTheme === "light" ? (
              <span>Light Mode</span>
            ) : (
              <span>Dark Mode</span>
            )}

            <div className={classes.slideBtn}>
              <div className={`${classes.circle} ${changePosition}`}></div>
            </div>
          </div>
        </div>

        <div className={classes.themeSection}>
          <p
            onClick={() => {
              setConfirm(true);
            }}>
            Delete Account
          </p>
        </div>
      </div>
      <ConfirmDelete
        confirm={confirm}
        setConfirm={setConfirm}
        handleDelete={deleteUser}
      />
    </div>
  );
}

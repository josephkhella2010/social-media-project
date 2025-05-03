import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../../../store/store";
import { setLoginUser } from "../../../sliceReducer/loginSlice";
import axios from "axios";
import { getUsersRequest } from "../../../sliceReducer/userInformationSlice";
const useStyles = createUseStyles({
  welcomeMainWrapper: {
    //backgroundColor: "red",
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center"
  },
  welcomeWrapper: {
    width: "100%",
    maxWidth: "2000px",
    backgroundColor: "#decedd",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loginOrRegisterSection: {
    width: "100%",
    maxWidth: "700px",
    height: "500px",
    //backgroundColor: "green",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    padding: "20px",

    "& h1": {
      color: "#D52627",
      "@media (max-width: 650px)": {
        textAlign: "center"
      }
    },
    "& h3": {
      color: "#787878",
      "@media (max-width: 650px)": {
        textAlign: "center",
        width: "70%"
      },
      "@media (max-width: 390px)": {
        width: "90%"
      }
    },
    "@media (max-width: 650px)": {
      flexDirection: "column"
    }
  },
  leftSection: {
    width: "50%",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    "@media (max-width: 650px)": {
      width: "90%",
      alignItems: "center"
    }
  },
  RightSection: {
    width: "50%",
    //height: "80%",
    boxShadow: " 0px 2px 4px rgba(0, 0, 0, .1),0px 8px 16px rgba(0, 0, 0, .1)",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    "& form": {
      // backgroundColor: "orange",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      "& input": {
        height: "50px",
        padding: "10px",
        borderRadius: "5px",
        outline: "none",
        border: "1px solid gray"
      }
    },
    "@media (max-width: 650px)": {
      width: "70%"
    },
    "@media (max-width: 450px)": {
      width: "90%"
    }
  },

  BtnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    color: "white",
    "& button": {
      width: "70%",
      height: "40px",
      borderRadius: "5px",
      outline: "none",
      border: "1px solid gray",
      cursor: "pointer",
      "&:nth-of-type(1)": {
        backgroundColor: "#D52627",
        color: "white"
      },
      "&:nth-of-type(2)": {
        backgroundColor: "#42b72a",
        color: "white"
      }
    }
  },
  line: {
    width: "85%",
    height: "1.5px",
    backgroundColor: "gray",
    borderRadius: "5px"
  }
});
export default function WelcomeSection() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({ username: "", password: "" });

  const userState = useSelector((state: RootState) => state.loginInformation);
  const { userInformation } = useSelector(
    (state: RootState) => state.usersInformation
  );
  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);
  useEffect(() => {
    if (userState.user?.username) {
      navigate("/profile"); // Redirect if logged in
    }
  }, [userState.user, navigate]);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user.username || !user.password) {
      toast.error("Please fill all fields");
      return;
    }

    const findUser = userInformation.find(
      (users) => users.username === user.username
    );

    if (!findUser) {
      toast.error("Username does not exist");
      return; // Stop execution
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (user.password !== findUser.password) {
      toast.error("uncorrect password");
      setUser((prev) => ({ ...prev, password: "" }));
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        user,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;
      dispatch(setLoginUser({ user: data.user, token: data.token }));
      toast.success("Login successful!");
      setUser({ username: "", password: "" });
      navigate("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Invalid credentials";
        console.log(errorMessage);
        //toast.error(errorMessage);
      } else if (error instanceof Error) {
        //toast.error(error.message);
      } else {
        //toast.error("An unknown error occurred.");
      }
    }
  }

  return (
    <div className={classes.welcomeMainWrapper}>
      <div className={classes.welcomeWrapper}>
        <ToastContainer />
        <div>
          {userState.isLogged ? (
            <p>
              Welcome, {userState?.user?.firstName ?? ""}{" "}
              {userState?.user?.lastName ?? ""}
            </p>
          ) : null}
        </div>

        <div className={classes.loginOrRegisterSection}>
          <div className={classes.leftSection}>
            <h1>Connect friends</h1>
            <h3>
              Connect with friends and the world around you on Connect friends.
            </h3>
          </div>
          <div className={classes.RightSection}>
            <form action="" onSubmit={handleForm}>
              <input
                type="text"
                placeholder="Email or Username"
                value={user.username}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    username: e.target.value
                  }))
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <div className={classes.BtnContainer}>
                <button type="submit">Log in</button>
                <div className={classes.line}></div>
                <button type="button" onClick={() => navigate("/register")}>
                  Create Accout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

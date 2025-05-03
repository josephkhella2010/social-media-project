import React, { useEffect, useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../../store/store";
import {
  getUsersRequest,
  registerUserRequest
} from "../../sliceReducer/userInformationSlice";
import { userInformationType } from "../helps/interfacesType";
const useStyles = createUseStyles({
  mainWrapper: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    justifyContent: "center"
  },
  wrapper: {
    width: "100%",
    maxWidth: "2000px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  registerContainer: {
    backgroundColor: "#eeeeee",
    padding: "20px",
    boxSizing: "border-box",
    width: "50%",
    height: "fit-content",
    borderRadius: "15px",
    boxShadow: "0px 0px 5px 2px #00000047",
    margin: "130px 0px 70px 0px",
    "@media (max-width: 650px)": {
      width: "80%"
    }
  },
  headerForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    borderBottom: "1px solid black",
    padding: "10px 0px",
    boxSizing: "border-box"
  },
  formSection: {
    padding: "10px 0px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  nameSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    "@media (max-width: 650px)": {
      flexDirection: "column",
      alignItems: "center"
    },
    "& input": {
      height: "40px",
      width: "45%",
      padding: "10px",
      borderRadius: "5px",
      border: "0.5px solid gray",
      "@media (max-width: 650px)": {
        width: "90%"
      }
    }
  },
  birthdaySection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  birthdayUpperContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  birthdayLowerContent: {},
  genderSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  genderUpperContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  genderLowerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    "& label": {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  },
  EmailandPasswordContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    "& input": {
      height: "40px",
      width: "90%",
      padding: "10px",
      borderRadius: "5px",
      border: "0.5px solid gray"
    }
  },

  paragraphSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "inherit"
  },
  btnSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    "& button": {
      width: "50%",
      cursor: "pointer",
      padding: "10px",
      boxSizing: "border-box",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      backgroundColor: "#00a400",
      color: "white",
      fontWeight: "bold",
      "@media (max-width: 650px)": {
        width: "70%"
      }
    },
    "& p": {
      color: "#1877f2",
      cursor: "pointer"
    }
  }
});

export default function RegisterSection() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [information, setInformation] = useState<userInformationType>({
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    username: "",
    password: "",
    email: "",
    photoUrl: ""
  });
  //const [userInformation, setUserInformation] = useState<InformationType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !information.firstName ||
      !information.lastName ||
      !information.birthDay ||
      !information.gender ||
      !information.username ||
      !information.password ||
      !information.email
    ) {
      console.log(information);

      toast.error("Please fill all fields");
      return;
    } else if (information.password.length < 6) {
      toast.error("password must be more tha 6 letter");
      setInformation((prev) => ({ ...prev, password: "" }));
    } else {
      setInformation({
        firstName: "",
        lastName: "",
        birthDay: "",
        gender: "",
        username: "",
        password: "",
        email: "",
        photoUrl: ""
      });
      toast.success("successfully registered Account");
      console.log(information);
      dispatch(registerUserRequest(information));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
  const { userInformation } = useSelector(
    (state: RootState) => state.usersInformation
  );

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);
  console.log(userInformation);

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.registerContainer}>
          <div className={classes.headerForm}>
            <ToastContainer />
            <h3>Create a new account</h3>
            <h5>It’s quick and easy.</h5>
          </div>
          <form action="" onSubmit={handleForm} className={classes.formSection}>
            <div className={classes.nameSection}>
              <input
                type="text"
                placeholder="First name"
                value={information.firstName}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    firstName: e.target.value
                  }))
                }
              />
              <input
                type="text"
                placeholder="Last name"
                value={information.lastName}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    lastName: e.target.value
                  }))
                }
              />
            </div>
            <div className={classes.birthdaySection}>
              <div className={classes.birthdayUpperContent}>
                <h6>Birthday</h6>
                <HiQuestionMarkCircle />
              </div>
              <div className={classes.birthdayLowerContent}>
                <input
                  type="date"
                  name=""
                  id=""
                  value={information.birthDay}
                  onChange={(e) =>
                    setInformation((prev) => ({
                      ...prev,
                      birthDay: e.target.value
                    }))
                  }
                />
              </div>
            </div>
            <div className={classes.genderSection}>
              <div className={classes.genderUpperContent}>
                <h6>Gender</h6>
                <HiQuestionMarkCircle />
              </div>

              <div className={classes.genderLowerContent}>
                <label htmlFor="">
                  <input
                    type="radio"
                    name=""
                    id=""
                    value="male"
                    checked={information.gender === "male"}
                    onChange={(e) =>
                      setInformation((prev) => ({
                        ...prev,
                        gender: e.target.value
                      }))
                    }
                  />
                  <p>Male</p>
                </label>
                <label htmlFor="">
                  <input
                    type="radio"
                    name=""
                    id=""
                    value="female"
                    checked={information.gender === "female"}
                    onChange={(e) =>
                      setInformation((prev) => ({
                        ...prev,
                        gender: e.target.value
                      }))
                    }
                  />
                  <p>Female</p>
                </label>
              </div>
            </div>
            <div className={classes.EmailandPasswordContainer}>
              <input
                type="text"
                placeholder="Username"
                value={information.username}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    username: e.target.value
                  }))
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={information.email}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
              />

              <input
                type="password"
                placeholder="password"
                value={information.password}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
              />
              <input
                type="text"
                placeholder="url"
                value={information.photoUrl}
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    photoUrl: e.target.value
                  }))
                }
              />
            </div>
            <div className={classes.paragraphSection}>
              <p>
                People who use our service may have uploaded your contact
                information to Facebook. Learn more.
              </p>
              <p>
                By clicking Sign Up, you agree to our Terms. Learn how we
                collect, use and share your data in our Privacy Policy and how
                we use cookies and similar technology in our Cookies Policy. You
                may receive SMS Notifications from us and can opt out any time.
              </p>
            </div>
            <div className={classes.btnSection}>
              <button type="submit">Sign up</button>
              <p onClick={() => navigate("/")}>Already have an account?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

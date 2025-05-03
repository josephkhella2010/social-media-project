import React, { useEffect, useRef } from "react";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { logoutUser } from "../../../sliceReducer/loginSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const useStyles = createUseStyles({
  profileNavBar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#ffffff",
    display: "flex",
    padding: "0px 20px 0px 0px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    cursor: "pointer",
    position: "relative"
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    padding: "10px  20px",
    boxSizing: "border-box",
    width: "200px",
    transition: "background-color 0.5s linear",
    "@media (max-width: 550px)": {
      width: "130px"
    },
    "& img": {
      width: "40px",
      height: "90%",
      "@media (max-width: 450px)": {
        width: "30px",
        height: "80%"
      }
    },
    "&.addColor": {
      //backgroundColor: "#f3f3f3"
      backgroundColor: "#decedd"
    },
    "&.removeColor": {
      backgroundColor: "transparent"
    }
  },
  userName: {
    width: "50px",
    height: "50px",
    background: "linear-gradient(#ffe0fd, #61305e)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    "& p": {
      fontWeight: "bold",
      fontSize: "20px",
      "@media (max-width: 550px)": {
        fontSize: "15px"
      }
    }
  },
  icon: {
    fontWeight: "bold",
    fontSize: "20px",
    "@media (max-width: 450px)": {
      fontSize: "13px"
    }
  },
  middleSection: {
    display: "flex",
    gap: "20px",
    fontSize: "20px",
    "@media (max-width: 480px)": {
      display: "none"
    }
  },
  rightSection: {
    display: "flex",
    gap: "20px"
  },
  settingContainer: {
    position: "absolute",
    top: "105%",
    //backgroundColor: "#f3f3f3",
    background: "linear-gradient(#dd9dd9, #975a93, #d69fd2, #a4499f)",
    left: "50px",
    padding: "10px 25px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRadius: "5px",
    boxShadow: "0px 0px 2px 2px #0000001f",
    zIndex: "1000",

    "& p": {
      //color: "#787373",
      color: "#ffffff",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        color: "orange"
      }
    }
  }
});
interface Props {
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showSideMenu: boolean;
  showSetting: boolean;
  setShowSetting: (showSetting: boolean) => void;
}
export default function ProfileNavBar({
  setShowSideMenu,
  showSideMenu,
  showSetting,
  setShowSetting
}: Props) {
  const classes = useStyles();
  const userInfo = useSelector(
    (state: RootState) => state.loginInformation.user
  );
  //console.log(userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settingRef = useRef<HTMLDivElement>(null);

  const splitName =
    userInfo?.firstName && userInfo?.lastName
      ? userInfo.firstName.slice(0, 1).toUpperCase() +
        " " +
        userInfo.lastName.slice(0, 1).toUpperCase()
      : "";
  // function for close menu if i click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingRef.current &&
        !settingRef.current.contains(event.target as Node)
      ) {
        setShowSetting(false);
      }
    }

    if (showSetting) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSetting, setShowSetting]);
  return (
    <div className={classes.profileNavBar}>
      <div
        className={`${classes.leftSection} ${
          showSideMenu ? "addColor" : "removeColor"
        }`}>
        <img
          src="/fotos/chatLogo.jpg"
          alt="chat Logo"
          className="toggle-button"
          onClick={(e) => {
            setShowSideMenu((prev: boolean) => !prev);
            e.stopPropagation();
          }}
        />
        {userInfo && (
          <div
            className={classes.userName}
            onClick={() => setShowSetting(!showSetting)}>
            <p>{splitName}</p>
          </div>
        )}
      </div>

      <div className={classes.middleSection}>
        <ImHome
          className={classes.icon}
          onClick={() => navigate("/profile/")}
        />
        <HiOutlineUsers
          className={classes.icon}
          onClick={() => navigate("/profile/friend")}
        />
        <RiVideoAddFill
          className={classes.icon}
          onClick={() => navigate("/profile/video")}
        />
      </div>
      <ToastContainer />
      <div className={classes.rightSection}>
        <BsChatDots
          className={classes.icon}
          onClick={() => navigate("/profile/friend")}
        />
        <IoMdNotifications className={classes.icon} />
      </div>
      {showSetting && (
        <div
          className={classes.settingContainer}
          ref={settingRef}
          onClick={(e) => e.stopPropagation()}>
          <p
            onClick={() => {
              navigate("/profile/setting");
              setShowSetting(false);
            }}>
            Setting
          </p>
          <p
            onClick={() => {
              navigate("/profile/edit");
              setShowSetting(false);
            }}>
            Edit Information
          </p>
          <p
            onClick={() => {
              setShowSetting(false);
              dispatch(logoutUser());
              setTimeout(() => {
                navigate("/");
              }, 2000);

              toast.success("logout successful!");
            }}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

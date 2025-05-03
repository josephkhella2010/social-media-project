import React, { useEffect, useRef } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { MdOutlineVideoChat } from "react-icons/md";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { setShowFriendsSideBar } from "../../../sliceReducer/friendSlice";
import { useNavigate } from "react-router-dom";
const useStyles = createUseStyles({
  sideBarContainer: {
    backgroundColor: "#decedd",
    width: "200px",
    //height: "100dvh",
    height: "calc(100dvh - 60px)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    cursor: "pointer",
    //position: "fixed",
    position: "relative",
    left: "-100%",
    transition: "left 0.5s linear",
    "& p": {
      padding: "20px 10px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: "30px",
      fontSize: "20px",
      "@media (max-width: 450px)": {
        fontSize: "13px"
      }
    },
    "@media (max-width: 550px)": {
      width: "130px"
    }
  },
  icon: {},
  showMenu: {
    left: "0%"
  }
});
interface Props {
  showSideMenu: boolean;
  setShowSideMenu: (showSideMenu: boolean) => void;
}

export default function ProfileSideBar({
  showSideMenu,
  setShowSideMenu
}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const addClass = showSideMenu ? classes.showMenu : "";
  const sidebarRef = useRef<HTMLDivElement>(null);
  /*   const showFriendSideBar = useSelector(
    (state: RootState) => state.friends.showFriendsSideBar
  ); */
  const dispatch = useDispatch();
  // add function to close if u click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).classList.contains("toggle-button")
      ) {
        setShowSideMenu(false);
      }
    };

    if (showSideMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideMenu, setShowSideMenu]);

  return (
    <div
      className={`${classes.sideBarContainer} ${addClass}`}
      ref={sidebarRef}
      onMouseDown={(e) => e.stopPropagation()}>
      <p onClick={() => navigate("/profile/")}>
        <ImHome className={classes.icon} /> Home
      </p>
      <p
        onClick={() => {
          navigate("/profile/friend");
          setShowSideMenu(false);
          dispatch(setShowFriendsSideBar(true));
        }}>
        {" "}
        <HiOutlineUsers className={classes.icon} />
        Friends
      </p>
      <p onClick={() => navigate("/profile/video")}>
        <MdOutlineVideoChat className={classes.icon} /> Video
      </p>
    </div>
  );
}

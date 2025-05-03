import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Routes, Route } from "react-router-dom";
import ProfileNavBar from "./childComponent/ProfileNavBar";
import ProfileSideBar from "./childComponent/ProfileSideBar";
import ProfileHomeSection from "./childComponent/ProfileHomeSection";
import ProfileVideoSection from "./childComponent/ProfileVideoSection";
import ProfileChatSection from "./childComponent/ProfileChatSection";
import ProfileSettingSection from "./childComponent/ProfileSettingSection";
import ProfileEditInformation from "./childComponent/ProfileEditInformation";
import ProfileFriendSection from "./childComponent/ProfileFriendSection";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FriendsList from "./childComponent/FriendsList";
import ProfileFriendInformation from "./childComponent/ProfileFriendInformation";
import ProfileAllVideo from "./childComponent/ProfileAllVideo";
import ProfileAllImages from "./childComponent/ProfileAllImages";
const useStyles = createUseStyles({
  mainWrapper: {
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center"
  },
  wrapper: {
    width: "100%",
    maxWidth: "2000px",
    height: "100%",
    //position: "relative",
    overflowX: "hidden"
  },
  mainContainer: {
    width: "100vw",
    height: "calc(100dvh - 60px)",
    overflowY: "auto",
    display: "flex",
    gap: "30px",
    //justifyContent: "space-between",
    position: "relative",
    //backgroundColor: "red",
    overflowX: "hidden",
    "@media (max-width: 550px)": {
      //left: "170px",
      gap: "5px"
    }
  },
  profileRightSection: {
    //flex: 1,
    width: "calc(100vw - 250px)",
    height: "calc(100dvh - 60px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    },

    "@media (max-width: 550px)": {
      width: "calc(100vw - 150px)",
      // padding: "0px 15px 0 0",
      boxSizing: "border-box"
    }
  },
  light: {
    backgroundColor: "white",
    color: "black"
  },
  dark: {
    backgroundColor: "#926f90e6",
    color: "#3a3a3a"
  }
});

export default function ProfileSection() {
  const classes = useStyles();
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const addThemeColor = theme === "light" ? classes.light : classes.dark;

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth < 550) {
        setShowSideMenu(true);
      } else {
        setShowSideMenu(false);
      }
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [showSideMenu, setShowSideMenu]);

  return (
    <div className={classes.mainWrapper}>
      <div className={`${classes.wrapper} ${addThemeColor}`}>
        <ProfileNavBar
          setShowSideMenu={setShowSideMenu}
          showSideMenu={showSideMenu}
          showSetting={showSetting}
          setShowSetting={setShowSetting}
        />
        <FriendsList setShowSideMenu={setShowSideMenu} />

        <div className={classes.mainContainer}>
          <ProfileSideBar
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
          />
          <div className={classes.profileRightSection}>
            <Routes>
              <Route path="/" element={<ProfileHomeSection />} />
              <Route path="video" element={<ProfileVideoSection />} />
              <Route path="friend" element={<ProfileFriendSection />} />
              <Route path="friend/:id" element={<ProfileFriendInformation />} />
              <Route path="chat/:friendId" element={<ProfileChatSection />} />
              <Route path="setting" element={<ProfileSettingSection />} />
              <Route path="edit" element={<ProfileEditInformation />} />
              <Route path="allVideo" element={<ProfileAllVideo />} />
              <Route path="allImages" element={<ProfileAllImages />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

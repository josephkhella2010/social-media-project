import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { setShowFriendsSideBar } from "../../../sliceReducer/friendSlice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { fetchFriend } from "../../../sliceReducer/showFriendSlice";
import { friendsType } from "../../helps/interfacesType";
const useStyles = createUseStyles({
  friendMainContainer: {
    backgroundColor: "#decedd",
    padding: " 20px 10px 20px 10px ",
    textAlign: "center",
    width: "200px",
    height: "calc(100dvh - 60px)",
    position: "fixed",
    left: "0px",
    top: "60px",
    zIndex: "100",
    "@media (max-width: 550px)": {
      width: "130px"
    }
  },
  friendsTopSection: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
    height: "155px",
    gap: "15px",
    "& input": {
      width: "100%",
      height: "35px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      padding: "10px"
    }
  },
  FriendsTopSectionTopContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  friendsListSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowY: "auto",
    height: "420px",
    paddingBottom: "20px",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  friendsListItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "20px",

    "& img": {
      width: "40px",
      height: "40px",
      borderRadius: "50%"
    }
  },
  friendsContainer: {
    textDecoration: "none"
  },
  dark: {
    color: "#900000"
  },
  light: {
    color: "#3a3a3a"
  }
});
interface Props {
  setShowSideMenu: (showSideMenu: boolean) => void;
}
export default function FriendsList({ setShowSideMenu }: Props) {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState<string>("");
  const theme = useSelector((state: RootState) => state.theme.theme);
  const addThemeColor = theme === "light" ? classes.light : classes.dark;

  const dispatch = useDispatch();
  const showFriendSideBar = useSelector(
    (state: RootState) => state.friends.showFriendsSideBar
  );
  const userState = useSelector((state: RootState) => state.loginInformation);
  const userId = userState?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchFriend(userId));
    } else {
      console.error("User ID is undefined!");
    }
  }, [dispatch, userId]);

  const friends = useSelector((state: RootState) => state.showFriend.friend);

  const [filterFriend, setFilterFriend] = useState<friendsType[]>([]);
  useEffect(() => {
    if (friends) {
      setFilterFriend(friends);
    }
  }, [friends]);
  // function to search for friend
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setSearchVal(newValue);

    if (newValue === "") {
      setFilterFriend(friends);
    } else {
      const filteredResults = friends.filter((friend) =>
        friend.name.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilterFriend(filteredResults);
    }
  }

  /*  */
  return (
    showFriendSideBar && (
      <div className={`${addThemeColor} ${classes.friendMainContainer}`}>
        <div className={classes.friendsTopSection}>
          <div className={classes.FriendsTopSectionTopContent}>
            <GoArrowLeft
              onClick={() => {
                dispatch(setShowFriendsSideBar(false));
                setShowSideMenu(true);
              }}
            />
            <p>All friends</p>
          </div>
          <p>
            {filterFriend?.length ?? 0 > 0 ? filterFriend?.length : "No"}{" "}
            friends
          </p>

          <input
            type="text"
            placeholder="Search friend...."
            value={searchVal}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className={classes.friendsListSection}>
          {filterFriend &&
            filterFriend.map((friend, index) => (
              <Link
                to={`/profile/chat/${friend.id}`}
                key={index}
                className={classes.friendsContainer}>
                {" "}
                <div key={index} className={classes.friendsListItemContent}>
                  <img src={friend.photoUrl} alt={friend.name} />
                  <p className={`${addThemeColor}`}>{`${friend.name
                    .charAt(0)
                    .toUpperCase()}${friend.name.slice(1).toLowerCase()}`}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    )
  );
}

import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchFriend } from "../../../sliceReducer/showFriendSlice";
const useStyles = createUseStyles({
  container: {
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    "& h1": {
      height: "160px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  friendsListSection: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "40px",
    paddingBottom: "20px",

    "@media (max-width: 650px)": {
      gridTemplateColumns: "repeat(2,1fr)"
    },
    "@media (max-width: 450px)": {
      gridTemplateColumns: "repeat(1,1fr)"
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
  friendsContent: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontWeight: "light",
    placeItems: "center",
    justifySelf: "center"
  }
});

const ProfileFriendSection: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const friends = useSelector((state: RootState) => state.showFriend.friend);
  const userState = useSelector((state: RootState) => state.loginInformation);
  const userId = userState?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchFriend(userId));
    } else {
      console.error("User ID is undefined!");
    }
  }, [dispatch, userId]);

  return (
    <div className={classes.container}>
      <h1>All friends</h1>
      <div className={classes.friendsListSection}>
        {friends &&
          friends.map((friend, index) => {
            return (
              <Link
                to={`/profile/friend/${friend.id}`}
                key={index}
                className={classes.friendsContent}>
                {" "}
                <div key={index} className={classes.friendsListItemContent}>
                  <img src={friend.photoUrl} alt={friend.name} />
                  <p>{`${friend.name.charAt(0).toUpperCase()}${friend.name
                    .slice(1)
                    .toLowerCase()}`}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ProfileFriendSection;
{
  /*       <FriendsList setShowSideMenu={setShowSideMenu} />
   */
}

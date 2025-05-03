import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { fetchFriend } from "../../../sliceReducer/showFriendSlice";
import { BsChatDots } from "react-icons/bs";
const useStyles = createUseStyles({
  container: {
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center"
  },
  informationSection: {
    width: "100%",
    display: "flex",
    gap: "50px",
    justifyContent: "center",
    marginTop: "30px",
    cursor: "pointer"
  },
  detailsContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  detailsContentTwo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    padding: "0px 30px",
    borderRadius: "10px",
    marginTop: "30px"
  },
  detailsInnerContent: {
    width: "300px",
    maxWidth: "500px",
    padding: "15px 0px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    gap: "2px",
    "@media (max-width: 620px)": {
      width: "auto"
    },
    "& p": {}
  }
});

export default function ProfileFriendInformation() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.showFriend.friend);
  const userState = useSelector((state: RootState) => state.loginInformation);
  const userId = userState?.user?.id;
  const [showInformation, setShowInformation] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFriend(userId));
    } else {
      console.error("User ID is undefined!");
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchFriend(userId));
    } else {
      console.error("User ID is undefined!");
    }
  }, [dispatch, userId]);
  const findFriend = friends.find((friend) => friend.id === Number(id));
  //console.log(findFriend);
  return (
    <div className={classes.container}>
      <h1> Profile of {findFriend?.name}</h1>
      <img
        src={findFriend?.photoUrl}
        alt="non foto"
        style={{ width: "100px", height: "100px" }}
      />
      <div className={classes.informationSection}>
        <p onClick={() => setShowInformation(!showInformation)}>
          more information
        </p>

        <Link to={`/profile/chat/${findFriend?.id}`}>
          <BsChatDots />
        </Link>
      </div>
      {showInformation && (
        <div className={classes.detailsContent}>
          <div className={classes.detailsContentTwo}>
            <div className={classes.detailsInnerContent}>
              <p>FirstName: </p>
              <p>
                {findFriend?.firstName?.charAt(0).toUpperCase()}
                {findFriend?.firstName?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className={classes.detailsInnerContent}>
              <p>LastName: </p>
              <p>
                {findFriend?.lastName?.charAt(0).toUpperCase()}
                {findFriend?.lastName?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className={classes.detailsInnerContent}>
              <p>Email: </p>
              <p>{findFriend?.email}</p>
            </div>
            <div className={classes.detailsInnerContent}>
              <p>Gender: </p>
              <p>
                {findFriend?.gender?.charAt(0).toUpperCase()}
                {findFriend?.gender?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className={classes.detailsInnerContent}>
              <p>BirthDay: </p>
              <p> {findFriend?.birthDay}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

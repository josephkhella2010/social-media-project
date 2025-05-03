import { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import axios from "axios";
import { ChatSmsType } from "../../helps/interfacesType";

const useStyles = createUseStyles({
  chatWrapper: {
    borderRadius: "8px",
    textAlign: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center"
  },
  chatContainer: {
    height: "90%",
    width: "70%",
    padding: "15px",
    "@media (max-width: 550px)": {
      width: "90% "
    }
  },
  upperSection: {
    marginBottom: "30px",
    padding: "20px",
    height: "65%",
    overflowY: "auto",
    width: "100%",
    backgroundColor: "   #F9F7F2",
    boxShadow: "#00000036 0px 0px 3px 1px",
    borderRadius: "10px",

    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  chatSection: {
    width: "100%",
    padding: "20px",
    background: "linear-gradient(#decedd, #916f8f)",
    minHeight: "30px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    "& p": {
      wordBreak: "break-word",
      color: "white"
    }
  },
  chatSectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  lowerSection: {
    backgroundColor: "#F9F7F2",
    display: "flex",
    borderRadius: "10px",
    border: "none",
    padding: "15px",
    boxShadow: "#00000036 0px 0px 3px 1px",
    bottom: "50px",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    color: " #916f8f",

    "& textarea": {
      padding: "15px",
      outline: "none",
      border: "0.2px solid  #916f8f",
      borderRadius: "15px",
      resize: "none",
      width: "100% !important",
      height: "90% !important",
      overflow: "hidden"
    }
  },
  sendIcon: {
    cursor: "pointer"
  },
  senderName: {
    position: "absolute",
    bottom: "3px",
    right: "10px",
    color: "gold !important",
    fontSize: "12px"
  },
  dark: {
    backgroundColor: "#a6a6a687"
  },
  light: {
    backgroundColor: "#F9F7F2"
  }
});

export default function ProfileChatSection() {
  const classes = useStyles();
  const { friendId } = useParams();
  const friends = useSelector((state: RootState) => state.showFriend.friend);
  const user = useSelector((state: RootState) => state.loginInformation.user);
  const findFriend = friends.find(
    (friend) => String(friend.id) === String(friendId)
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  const addThemeColor = theme === "light" ? classes.light : classes.dark;
  const userId = user?.id;
  //console.log(user?.username);
  const findFriendId = findFriend?.id;

  // console.log(userId, findFriendId);

  const [smsArr, setSmsArr] = useState<ChatSmsType[]>([]);
  const [textVal, setTextVal] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSms = async () => {
    if (textVal === "") {
      return;
    }

    try {
      const newSms = {
        senderId: userId,
        recipientId: findFriendId,
        message: textVal
      };

      const response = await axios.post(
        `http://localhost:5002/api/send`,
        newSms
      );

      if (response.data.success) {
        fetchMessages();
        setTextVal("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // get
  async function fetchMessages() {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/send/${userId}/${findFriendId}`
      );
      //console.log(response.data);
      setSmsArr(response.data);

      if (response.data && Array.isArray(response.data)) {
        setSmsArr(response.data);
      } else {
        setSmsArr([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setSmsArr([]);
    }
  }
  useEffect(() => {
    if (userId && findFriendId) {
      fetchMessages();
    }
  }, [userId, findFriendId]);

  // Scroll to the bottom when smsArr updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [smsArr]);

  return (
    <div className={classes.chatWrapper}>
      <h1>Chat</h1>

      <div className={classes.chatContainer}>
        <div className={`${classes.upperSection} ${addThemeColor}`}>
          <div className={classes.chatSectionContainer}>
            {smsArr.length > 0 ? (
              smsArr.map((item, index) => {
                return (
                  <div key={index} className={classes.chatSection}>
                    <p>{item.message}</p>
                    <p className={classes.senderName}>{item.senderName}</p>
                  </div>
                );
              })
            ) : (
              <div> no chat sms</div>
            )}

            {/* Invisible div to scroll to the end */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className={`${classes.lowerSection} ${addThemeColor}`}>
          <textarea
            style={{ height: "100%" }}
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
          />
          <BiSend
            onClick={handleSms}
            className={classes.sendIcon}
            title={"send"}
          />
        </div>
      </div>
    </div>
  );
}

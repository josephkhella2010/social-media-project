import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaHeart, FaPhotoVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  deleteMedia,
  fetchDelete,
  fetchMedia
} from "../../../sliceReducer/mediaSlice";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
interface LikeProps {
  heart: number[];
  like: number[];
}
const useStyles = createUseStyles({
  container: {
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px"
  },
  upperSection: {
    backgroundColor: "#F9F7F2",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "10px",
    border: "none",
    padding: "15px",
    boxShadow: "#00000036 0px 0px 3px 1px",
    marginTop: "100px",
    width: "80%"
  },
  mediaContent: {
    display: "flex",
    width: "80%",
    justifyContent: "center",
    gap: "20px",
    "& p": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
      cursor: "pointer"
    },
    "@media (max-width: 550px)": {
      flexDirection: "column"
    }
  },
  mainSection: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    paddingBottom: "100px"
  },
  mediaSection: {
    backgroundColor: "#F9F7F2",
    padding: "70px 25px",
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    borderRadius: "10px",
    border: "none",
    boxShadow: "#00000036 0px 0px 3px 1px",
    "& img": {
      width: "70%",
      height: "300px",
      borderRadius: "10px"
    },
    "& video": {
      width: "70%",
      height: "250px",
      borderRadius: "10px"
    },
    "& p": {
      wordBreak: "break-word"
    },
    "@media (max-width: 550px)": {
      padding: "70px 15px"
    }
  },
  imgContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  LikeMainContainer: { display: "flex", justifyContent: "center" },
  LikeContainer: {
    display: "flex",
    padding: "20px 0px",
    borderTop: "1px solid #6c6c6e",
    borderBottom: "1px solid #6c6c6e",
    width: "70%",
    justifyContent: "space-between",
    "@media (max-width: 700px)": {
      flexDirection: "column",
      gap: "30px"
    }
  },
  LikeSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  innerLikeSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    "& p": {
      fontSize: "20px"
    }
  },
  "@keyframes shake": {
    "0%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-3px) rotate(-5deg)" },
    "50%": { transform: "translateX(3px) rotate(5deg)" },
    "75%": { transform: "translateX(-3px) rotate(-5deg)" },
    "100%": { transform: "translateX(0)" }
  },
  heartIcon: {
    fontSize: (props: LikeProps) => (props.heart ? "30px" : "24px"),
    color: (props: LikeProps) => (props.heart ? "red" : "black"),
    transition: "color 0.3s ease",
    animation: (props: LikeProps) => (props.heart ? "$shake 0.4s" : "none"),
    cursor: "pointer"
  },

  likeIcon: {
    fontSize: (props: LikeProps) => (props.like ? "30px" : "24px"),
    color: (props: LikeProps) => (props.like ? "#007bff" : "black"),
    transition: "color 0.3s ease",
    animation: (props: LikeProps) => (props.like ? "$shake 0.4s" : "none"),
    cursor: "pointer"
  },
  commentSection: {
    display: "flex",
    gap: "10px"
  },
  commentIcon: {
    cursor: "pointer",
    fontSize: "20px"
  },
  commentForm: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& form": {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      "& textarea": {
        height: "100px",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "transparent",
        "&::placeholder": {
          color: "black"
        }
      }
    }
  },
  submitBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    "& button": {
      width: "50px",
      height: "25px",
      border: "1px solid black",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": { backgroundColor: "gray" }
    }
  },
  confirmationContainer: {
    backgroundColor: "#0000006e",
    width: "100vw",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "60px",
    left: "0px"
  },
  confirmationSection: {
    backgroundColor: "white",
    width: "50%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: "10px",
    padding: "20px 10px",
    gap: "30px",
    "& button": {
      height: "40px",
      padding: "10px 15px",
      border: "none",
      cursor: "pointer",
      color: "white",
      backgroundColor: "black",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "capitalize",
      transition: "transform 0.3s linear",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        transform: "scale(1.1)"
      },
      "@media (max-width: 750px)": {
        fontSize: "16px"
      }
    },
    "@media (max-width: 850px)": {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    "@media (max-width: 750px)": {
      width: "90%",
      fontSize: "10px"
    }
  }
});

export default function ProfileHomeSection() {
  const [like, setLike] = useState<number[]>([]);
  const [heart, setHeart] = useState<number[]>([]);
  const classes = useStyles({ like, heart });
  const [showComment, setShowComment] = useState<number[]>([]);
  const [commentVal, setCommentVal] = useState<{ [key: number]: string }>({});
  const [commentArr, setCommentArr] = useState<string[][]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.loginInformation.user);
  //console.log(user);
  const navigate = useNavigate();

  const allData = useSelector((state: RootState) => state.media.mediaList);
  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);
  //console.log(allData);
  /*   const handleCommentForm = (
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault();
    const newComment = [...commentArr, commentVal];
    setCommentArr(newComment);
    setCommentVal("");
    //setShowComment(false);
    setShowComment((prev) => prev.filter((item) => item !== index));
  }; */
  console.log(commentArr);
  // toggle like icon
  const toggleLike = (index: number) => {
    let newIndex = [...like];

    if (newIndex.includes(index)) {
      newIndex = newIndex.filter((item) => item !== index);
    } else {
      newIndex.push(index);
    }
    setLike(newIndex);
  };
  // toggle heart icon
  const toggleHeart = (index: number) => {
    let newIndex = [...heart];

    if (newIndex.includes(index)) {
      newIndex = newIndex.filter((item) => item !== index);
    } else {
      newIndex.push(index);
    }
    setHeart(newIndex);
  };
  // toggle comment
  const toggleComment = (index: number) => {
    let newIndex = [...showComment];
    if (newIndex.includes(index)) {
      newIndex = newIndex.filter((item) => item !== index);
    } else {
      newIndex.push(index);
    }
    setShowComment(newIndex);
  };
  ///
  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    setCommentVal((prev) => ({
      ...prev,
      [index]: e.target.value
    }));
  };
  ///
  const handleCommentForm = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    setCommentArr((prev) => {
      const newComments = [...prev];

      if (!newComments[index]) {
        newComments[index] = [commentVal[index]];
      } else {
        newComments[index] = [...newComments[index], commentVal[index]];
      }

      return newComments;
    });

    setCommentVal((prev) => ({
      ...prev,
      [index]: ""
    }));
    setShowComment((prev) => prev.filter((item) => item !== index));
  };
  // function for delete object
  const [confirm, setConfirm] = useState<boolean>(false);
  const [imgId, setImgId] = useState<number | null>(null);
  const handleDelete = () => {
    try {
      if (confirm) {
        dispatch(fetchDelete(imgId));
        dispatch(deleteMedia(imgId));
        setConfirm(false);
      }
    } catch (error) {
      console.error("Error deleting media:", error); // Fix: Log full error details
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.upperSection}>
        <h3>{`${user?.firstName?.charAt(0).toUpperCase()}${user?.firstName
          ?.slice(1)
          .toLowerCase()} ${user?.lastName
          ?.charAt(0)
          .toUpperCase()}${user?.lastName?.slice(1).toLowerCase()}`}</h3>
        <div className={classes.mediaContent}>
          <p onClick={() => navigate("/profile/allImages")}>
            {" "}
            <HiOutlinePhotograph />
            <span> Your photos</span>
          </p>
          <p onClick={() => navigate("/profile/allVideo")}>
            <FaPhotoVideo />
            <span> Your Video</span>
          </p>
        </div>
      </div>
      <div className={classes.mainSection}>
        {allData &&
          allData.map((media, index) => {
            const { comment, filename, filetype, mediaUrl } = media;
            const isLiked = like.includes(index);
            const isHearted = heart.includes(index);

            return (
              <div key={index} className={classes.mediaSection}>
                {comment && <p>{comment}</p>}
                {filetype.includes("image") ? (
                  <div className={classes.imgContainer}>
                    <img
                      src={`http://localhost:5002${mediaUrl}`}
                      alt={filename}
                    />
                  </div>
                ) : (
                  <div className={classes.imgContainer}>
                    <video
                      controls
                      className="img-fluid rounded shadow-sm"
                      width="100%">
                      <source
                        src={`http://localhost:5002${mediaUrl}`}
                        type={filetype}
                      />
                    </video>
                  </div>
                )}
                <div className={classes.LikeMainContainer}>
                  <div className={classes.LikeContainer}>
                    <div className={classes.LikeSection}>
                      <div className={classes.innerLikeSection}>
                        <FaHeart
                          className={isHearted ? classes.heartIcon : ""}
                          onClick={() => toggleHeart(index)}
                        />
                        <p>{heart.includes(index) ? "1" : ""}</p>
                      </div>
                      <div className={classes.innerLikeSection}>
                        <AiOutlineLike
                          className={isLiked ? classes.likeIcon : ""}
                          onClick={() => toggleLike(index)}
                        />
                        <p>{like?.includes(index) ? "1" : ""}</p>
                      </div>
                    </div>

                    <div className={classes.commentSection}>
                      <BiCommentDetail
                        title="add comment"
                        className={classes.commentIcon}
                        onClick={() => toggleComment(index)}
                      />
                      <p
                        onClick={() => {
                          setConfirm(true);
                          setImgId(media.id);
                        }}>
                        Delete
                      </p>
                    </div>
                  </div>
                </div>
                {showComment.includes(index) && (
                  <div className={classes.commentForm}>
                    <form
                      action=""
                      onSubmit={(e) => handleCommentForm(e, index)}>
                      <textarea
                        name=""
                        id=""
                        placeholder=" add comment ...."
                        value={commentVal[index] || ""}
                        onChange={(e) =>
                          handleCommentChange(e, index)
                        }></textarea>
                      <div className={classes.submitBtnContainer}>
                        <button type="submit" title="send">
                          <VscSend />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {commentArr[index] && (
                  <div className="commentDisplay">
                    {commentArr[index].map((comment, idx) => (
                      <p key={idx}>{comment}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {confirm && (
        <div className={classes.confirmationContainer}>
          <div className={classes.confirmationSection}>
            <button onClick={() => handleDelete()}>
              Are u sure to delete foto
            </button>
            <button onClick={() => setConfirm(false)}>cancel </button>
          </div>
        </div>
      )}
    </div>
  );
}

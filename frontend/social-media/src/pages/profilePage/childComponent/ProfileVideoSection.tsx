import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedia } from "../../../sliceReducer/mediaSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const useStyles = createUseStyles({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    "& form": {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      width: "100%",
      "& div": {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        gap: "20px",
        boxSizing: "border-box"
      }
    },
    "& h2": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px"
    }
  },
  container: {
    boxSizing: "border-box",
    borderRadius: "8px",
    textAlign: "center"
  },
  chooseFileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  hiddenInput: {
    display: "none"
  },
  uploadButton: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    width: "130px",
    height: "30px",
    padding: "20px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    "@media (max-width: 550px)": {
      width: "100%"
    },
    "&:hover": {
      backgroundColor: "#45a049"
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)"
    }
  },
  previewContainer: {
    width: "200px",
    height: "300px"
  },
  previewImage: {
    width: "200px",
    height: "300px"
  },
  previewVideo: {
    width: "200px",
    height: "300px"
  },
  textareaContainer: {
    width: "250px",
    height: "100px",
    "& textarea": {
      width: "100%",
      height: "100%",
      padding: "10px",
      boxSizing: "border-box"
    },
    "@media (max-width: 550px)": {
      width: "100%"
    }
  },
  submitBtn: {
    width: "150px",
    height: "40px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    "@media (max-width: 550px)": {
      width: "100%"
    }
  },
  containerSection: {
    display: "flex",
    gap: "30px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 700px)": {
      flexDirection: "column"
    }
  },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    "& h5": {
      fontSize: "16px"
    }
  },
  video: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    border: "0.75px solid gray",
    cursor: "pointer",
    "& video": {
      width: "100px",
      height: "100px",
      borderRadius: "10px"
    }
  },
  fotoContainer: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "5px",
    "& h5": {
      fontSize: "16px"
    }
  },
  foto: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    border: "0.75px solid gray",
    cursor: "pointer",
    "& img": {
      height: "100%",
      width: "100px",
      borderRadius: "10px"
    }
  },
  span: {
    fontSize: "13px",
    fontWeight: "lighter"
  }
});

export default function ProfileVideoSection() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const classes = useStyles();
  const { mediaList, loading, error, message } = useSelector(
    (state: RootState) => state.media
  );

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const fetchData = () => {
    dispatch(fetchMedia());
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // ✅ Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Handle comment change
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  //

  // ✅ Handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("comment", comment);

      // ✅ Pass token in headers
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // ✅ Make direct POST request with Axios
      const response = await axios.post(
        "http://localhost:5002/api/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("File uploaded successfully!");

      console.log("✅ Upload successful:", response.data);

      // ✅ Reset state
      setFile(null);
      setFilePreview(null);
      setFileType(null);
      setComment("");
      fetchData();
    } catch (err: unknown) {
      console.error("❌ Error uploading file:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to upload file.");
      }
    }
  };

  // ✅ Filter videos and images
  const filterVideos = mediaList.filter((media) =>
    media.filetype.startsWith("video")
  );
  const filterImages = mediaList.filter((media) =>
    media.filetype.startsWith("image")
  );

  return (
    <div className={classes.mainWrapper}>
      <h2>Upload Media</h2>
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit}>
        <div>
          <div className={classes.chooseFileContainer}>
            <input
              type="file"
              accept="image/*,video/*"
              id="file-input"
              onChange={handleFileChange}
              className={classes.hiddenInput}
            />
            <label htmlFor="file-input" className={classes.uploadButton}>
              Choose File
            </label>

            {filePreview && (
              <div className={classes.previewContainer}>
                {fileType?.startsWith("image") ? (
                  <img
                    src={filePreview}
                    alt="Selected file"
                    className={classes.previewImage}
                  />
                ) : fileType?.startsWith("video") ? (
                  <video controls className={classes.previewVideo}>
                    <source src={filePreview} type={fileType} />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            )}
          </div>
          <div className={classes.textareaContainer}>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Enter a comment (optional)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={classes.submitBtn}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <div className={classes.containerSection}>
        <div
          className={classes.videoContainer}
          onClick={() => navigate("/profile/allVideo")}>
          <div className={classes.video}>
            <video controls className="img-fluid rounded shadow-sm">
              <source
                src={`http://localhost:5002${filterVideos[0]?.mediaUrl}`}
                type={filterVideos[0]?.filetype}
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <h5>
            Vidoes{" "}
            <span className={classes.span}>
              ({filterVideos && filterVideos.length} Videos)
            </span>
          </h5>
        </div>
        <div
          className={classes.fotoContainer}
          onClick={() => navigate("/profile/allImages")}>
          <div className={classes.foto}>
            <img
              src={`http://localhost:5002${filterImages[0]?.mediaUrl}`}
              alt="no foto"
            />
          </div>
          <h5>
            photos{" "}
            <span className={classes.span}>
              ({filterImages && filterImages.length} images)
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}

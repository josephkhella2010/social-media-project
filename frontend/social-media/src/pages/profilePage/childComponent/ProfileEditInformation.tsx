import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateUserInfo } from "../../../sliceReducer/loginSlice";
import axios from "axios";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    "& h1": {
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 400px)": {
        fontSize: "20px"
      }
    },
    "@media (max-width: 400px)": {
      padding: "10px"
    }
  },
  detailsSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px",
    width: "100%",
    "@media (max-width: 400px)": {
      padding: "10px"
    }
  },
  rowDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
    borderBottom: "1px solid #eee",
    "@media (max-width: 670px)": {
      flexDirection: "column",
      gap: "20px"
    },
    "@media (max-width: 400px)": {
      fontSize: "10px",
      wordBreak: "break-word"
    },
    "& button": {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#0056b3"
      },
      "@media (max-width: 670px)": {
        width: "90%"
      }
    }
  },
  confirmationContainer: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  confirmationSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    "& input": {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%"
    },
    "& button": {
      padding: "10px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#218838"
      }
    },
    "& .cancelBtn": {
      backgroundColor: "#dc3545",
      "&:hover": {
        backgroundColor: "#c82333"
      }
    }
  }
});

export default function ProfileEditInformation() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Get user info from Redux state
  const userInfo = useSelector(
    (state: RootState) => state.loginInformation.user
  );
  console.log(userInfo);
  const [showEdit, setShowEdit] = useState(false);
  const [editField, setEditField] = useState<
    "firstName" | "lastName" | "email" | "gender" | null
  >(null);
  const [newVal, setNewVal] = useState("");

  // Open the edit modal
  const handleEdit = (field: "firstName" | "lastName" | "email" | "gender") => {
    setEditField(field);
    setNewVal(userInfo?.[field] || "");
    setShowEdit(true);
  };

  // Save the new value
  const handleSave = async () => {
    if (!newVal || !editField) return;

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.error("No token found");
        return;
      }

      const id = String(userInfo?.id);
      if (!id) {
        console.error("No user ID found");
        return;
      }

      // Make API request to update user info
      const response = await axios.put(
        `http://localhost:5002/api/user/userDetails/${id}`,
        { [editField]: newVal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        // Update Redux state
        dispatch(updateUserInfo({ ...userInfo, [editField]: newVal }));
        setShowEdit(false);
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Edit Profile</h1>
      <div className={classes.detailsSection}>
        {/* First Name */}
        <div className={classes.rowDetails}>
          <p>First Name: {userInfo?.firstName ?? ""}</p>
          <button onClick={() => handleEdit("firstName")}>Edit</button>
        </div>

        {/* Last Name */}
        <div className={classes.rowDetails}>
          <p>Last Name: {userInfo?.lastName ?? ""}</p>
          <button onClick={() => handleEdit("lastName")}>Edit</button>
        </div>

        {/* Email */}
        <div className={classes.rowDetails}>
          <p>Email: {userInfo?.email ?? ""}</p>
          <button onClick={() => handleEdit("email")}>Edit</button>
        </div>

        {/* Gender */}
        <div className={classes.rowDetails}>
          <p>Gender: {userInfo?.gender ?? ""}</p>
          <button onClick={() => handleEdit("gender")}>Edit</button>
        </div>
      </div>

      {/* Edit Confirmation Modal */}
      {showEdit && (
        <div className={classes.confirmationContainer}>
          <div className={classes.confirmationSection}>
            <input
              type="text"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              //placeholder={`New ${editField}`}
            />
            <button onClick={handleSave}>Save</button>
            <button className="cancelBtn" onClick={() => setShowEdit(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

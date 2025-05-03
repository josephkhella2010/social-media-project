/* const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json()); // ✅ For JSON data
app.use(express.urlencoded({ extended: true })); // ✅ For form data
// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Serve static files (uploads directory for media files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const register = require("./backendRouteTwo/register");
const login = require("./backendRouteTwo/login");
const mediaRoutes = require("./backendRouteTwo/media");
const getUser = require("./backendRouteTwo/getUser");
// Use routes
app.use("/api/register", register); // Registration route
app.use("/api/login", login); // Login route
app.use("/user", getUser);
app.use("/api/media", mediaRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(express.json()); // ✅ For JSON data
app.use(express.urlencoded({ extended: true })); // ✅ For form data

// ✅ Proper fileUpload config
app.use(
  fileUpload({
    createParentPath: true, // ✅ Create parent directory if it doesn’t exist
    limits: { fileSize: 50 * 1024 * 1024 }, // ✅ 50 MB limit
    useTempFiles: true, // ✅ Use temp files instead of buffering
    tempFileDir: "/tmp/" // ✅ Temp file location
  })
);

// ✅ Serve static files (uploads directory for media files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routes
const register = require("./backendRouteTwo/register");
const login = require("./backendRouteTwo/login");
const mediaRoutes = require("./backendRouteTwo/media");
const getUser = require("./backendRouteTwo/getUser");
const friendsRoute = require("./backendRouteTwo/friends");
const deleteUserRoute = require("./backendRouteTwo/deleteUser");
const changeRoute = require("./backendRouteTwo/changeUserDetails");
const messageRoute = require("./backendRouteTwo/messages");
// ✅ Use routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/user", getUser);
app.use("/api/media", mediaRoutes);
app.use("/api/friend", friendsRoute);
app.use("/api/user", deleteUserRoute);
app.use("/api/user", changeRoute);
app.use("/api/send", messageRoute);
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
// ✅ Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

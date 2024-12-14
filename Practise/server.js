const express = require("express");
const dotenv = require("dotenv").config();
const userRoutes = require("./userRoutes");
const errorHandler = require("./midleware/errorhandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");
const forumPost = require("./routes/postRoutes");
const refreshToken = require("./routes/refreshTokenRoutes");
const validatePermission = require("./routes/validatePermissionRoutes");

connectDb();

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

// Route middlewares
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRouter);
app.use("/api/like", likeRouter);
app.use("/api/posts", forumPost);
app.use("/api/refresh-token", refreshToken);
app.use("/api/resource", validatePermission);
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

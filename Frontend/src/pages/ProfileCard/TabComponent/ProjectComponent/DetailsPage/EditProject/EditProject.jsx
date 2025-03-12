import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import { FaPlus, FaTimes, FaCamera } from "react-icons/fa";
import axiosInstance from "../../../../../../Auth/Axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProjectModal = ({
  open,
  handleClose,
  projectId,
  apiBaseUrl,
  onProjectUpdate,
}) => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Draggable modal state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (open && projectId) {
      fetchProjectData();
    }
  }, [open, projectId]);

  const fetchProjectData = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${apiBaseUrl}/projects/id/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName(data.name || "");
      setDescription(data.description || "");
      setTags(data.tags || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast.error("Failed to load project details.");
    }
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;
    setPosition({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
          width: 550,
          bgcolor: "#1a1a1b",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          color: "#d7dadc",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#d7dadc" }}
        >
          <FaTimes />
        </IconButton>

        <Typography variant="h6" sx={{ color: "#d7dadc", mb: 2 }}>
          Update Project
        </Typography>

        <Typography variant="body1" sx={{ color: "#818384", mt: 2 }}>
          Name
        </Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            bgcolor: "#272729",
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#343536" },
              "&:hover fieldset": { borderColor: "#818384" },
            },
          }}
        />

        <Typography variant="body1" sx={{ color: "#818384", mt: 2 }}>
          Description
        </Typography>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
            clipboard: { matchVisual: false },
          }}
          formats={["bold", "italic", "underline", "list", "bullet"]}
          style={{ backgroundColor: "#272729", color: "white" }}
        />

        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => setTags(tags.filter((t) => t !== tag))}
              sx={{ bgcolor: "#ff4500", color: "#fff" }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
          <TextField
            label="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            fullWidth
            sx={{
              bgcolor: "#272729",
              input: { color: "#d7dadc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#343536" },
                "&:hover fieldset": { borderColor: "#818384" },
              },
            }}
          />
          <IconButton
            onClick={() => setTags([...tags, newTag.trim()])}
            sx={{ color: "#ff4500" }}
          >
            <FaPlus />
          </IconButton>
        </Box>

        {/* File Upload with Camera Icon */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}>
          <input
            type="file"
            id="thumbnail-upload"
            style={{ display: "none" }}
            onChange={(e) => setThumbnailImage(e.target.files[0])}
          />
          <label htmlFor="thumbnail-upload">
            <IconButton component="span" sx={{ color: "#ff4500" }}>
              <FaCamera />
            </IconButton>
          </label>
          <Typography sx={{ color: "#818384" }}>
            {thumbnailImage ? thumbnailImage.name : "Upload Thumbnail"}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff4500",
            color: "#fff",
            "&:hover": { bgcolor: "#cc3700" },
            mt: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Update Project"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateProjectModal;

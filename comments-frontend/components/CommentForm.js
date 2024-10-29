import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useSocket } from "../context/SocketContext";

export default function CommentForm({ username }) {
  const [commentText, setCommentText] = useState("");
  const socket = useSocket();

  const handleSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        username,
        comment: commentText,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendComment", newComment);
      setCommentText("");
    }
  };

  return (
    <Box display="flex" alignItems="center" marginY={2}>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginLeft: "10px" }}
      >
        Post
      </Button>
    </Box>
  );
}

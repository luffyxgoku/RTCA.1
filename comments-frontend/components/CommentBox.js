import { Box, Typography } from "@mui/material";

export default function CommentBox({ comment }) {
  return (
    <Box border={1} borderRadius={5} padding={2} marginY={1}>
      <Typography variant="subtitle1" color="primary">
        {comment.username}
      </Typography>
      <Typography variant="body1">{comment.comment}</Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(comment.timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
}

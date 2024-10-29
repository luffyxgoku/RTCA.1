import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import SocketContext from "../context/SocketContext";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";

const Comments = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`
      );
      setComments(response.data);
    };

    fetchComments();

    if (socket) {
      socket.on("newComment", (newComment) => {
        setComments((prev) => [...prev, newComment]);
      });
    }

    return () => {
      if (socket) {
        socket.off("newComment");
      }
    };
  }, [socket]);

  return (
    <div>
      <h1>Comments</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CommentForm username={username} />
      <div>
        {comments.map((comment) => (
          <CommentBox key={comment.timestamp} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;

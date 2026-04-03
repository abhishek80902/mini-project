import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Avatar,
  Box,
  Divider
} from "@mui/material";
import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");

  const like = async () => {
    try {
      await API.post(`/posts/like/${post._id}`);
      refresh();
    } catch {
      toast.error("Error liking post");
    }
  };

  const addComment = async () => {
    try {
      if (!comment) return toast.error("Write something");

      await API.post(`/posts/comment/${post._id}`, {
        text: comment
      });

      setComment("");
      refresh();
    } catch {
      toast.error("Error commenting");
    }
  };

  return (
    <Card
      sx={{
        m: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-2px)"
        }
      }}
    >
      <CardContent>

        {/* 🔥 Header */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {post.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.username}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* 📝 Text */}
        <Typography sx={{ mt: 1, mb: 1 }}>
          {post.text}
        </Typography>

        {/* 🖼 Image */}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            style={{
              width: "100%",
              borderRadius: 12,
              marginTop: 10
            }}
          />
        )}

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* 💬 Comments */}
        <Box>
          {post.comments?.map((c, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: 14,
                mb: 0.5,
                background: "#f5f5f5",
                padding: "6px 10px",
                borderRadius: "10px"
              }}
            >
              💬 {c.text}
            </Typography>
          ))}
        </Box>
      </CardContent>

      {/* 🔥 Actions */}
      <CardActions sx={{ flexDirection: "column", alignItems: "stretch", px: 2 }}>

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" size="small" onClick={like}>
            ❤️ {post.likes.length}
          </Button>

          <Typography variant="caption" color="text.secondary">
            {post.comments.length} comments
          </Typography>
        </Box>

        {/* ✍️ Comment input */}
        <TextField
          size="small"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 1 }}
        />

        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={addComment}
        >
          Comment
        </Button>

      </CardActions>
    </Card>
  );
}
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Avatar,
  Box,
  Typography
} from "@mui/material";
import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CreatePost({ refresh }) {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePost = async () => {
    try {
      if (!text && !imagePreview) {
        return toast.error("Add text or image");
      }

      await API.post("/posts", {
        text,
        image: imagePreview || "",
        username: user?.username
      });

      toast.success("Posted!");
      setText("");
      setImagePreview(null);
      refresh();
    } catch {
      toast.error("Error posting");
    }
  };

  return (
    <Card sx={{ m: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Avatar>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography fontWeight="bold">
            {user?.username}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: 12
              }}
            />
          )}

          <Box display="flex" justifyContent="space-between">
            <input type="file" onChange={handleImage} />

            <Button variant="contained" onClick={handlePost}>
              Post
            </Button>
          </Box>
        </Stack>

      </CardContent>
    </Card>
  );
}
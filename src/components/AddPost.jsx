/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { addPost } from "../database/db";

const AddPostDialog = ({ open, onClose, currentUser, onPostAdded }) => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (!postContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const newPost = {
      author: currentUser.name,
      content: postContent,
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
    onPostAdded(newPost);
    setPostContent("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>새 글 작성</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="내용"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button onClick={handlePost} color="primary" variant="contained">
          게시
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;

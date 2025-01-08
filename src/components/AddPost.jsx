/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { addPost, posts } from "../database/db";

const AddPostDialog = ({ open, onClose, currentUser, onPostAdded }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    };

    const generatePostId = () => {
      return posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    };

    const newPost = {
      id: generatePostId(),
      authorId: currentUser.id,
      author: currentUser.name,
      title: postTitle,
      content: postContent,
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
    onPostAdded(newPost);
    setPostTitle("");
    setPostContent("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 700 }}>새 글 작성</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="제목"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          sx={{ marginBottom: 2, marginTop: 1 }}
        />
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
        <Button onClick={onClose} color="secondary" sx={{ fontWeight: 700 }}>
          취소
        </Button>
        <Button onClick={handlePost} color="primary" variant="contained" sx={{ fontWeight: 700 }}>
          게시
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;
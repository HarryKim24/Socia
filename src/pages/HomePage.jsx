/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { posts as dbPosts, addPost } from "../database/db";

const HomePage = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    setPosts([...dbPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostContent("");
  };

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
    setPosts((prevPosts) => [newPost, ...prevPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setPostContent("");
    setOpen(false);
  };

  const handleButtonClick = (action) => {
    if (!currentUser) {
      setLoginDialogOpen(true);
    } else {
      action();
    }
  };

  const handleLoginDialogClose = () => setLoginDialogOpen(false);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "300px",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #ddd",
            paddingTop: 4,
            position: "fixed",
            left: 0,
            backgroundColor: "background.default",
          }}
        >
          <Button
            fullWidth
            sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}
            onClick={() => handleButtonClick(handleOpen)}
          >
            글쓰기
          </Button>
          <Button
            fullWidth
            sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}
            onClick={() => handleButtonClick(() => console.log("인기글"))}
          >
            인기글
          </Button>
          <Button
            fullWidth
            sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}
            onClick={() => handleButtonClick(() => console.log("내 글"))}
          >
            내 글
          </Button>
          <Button
            fullWidth
            sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}
            onClick={() => handleButtonClick(() => console.log("내 댓글"))}
          >
            내 댓글
          </Button>
          <Button
            fullWidth
            sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}
            onClick={() => handleButtonClick(() => console.log("내 정보"))}
          >
            내 정보
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 4, marginLeft: "300px", height: "100%", overflowY: "auto" }}>
          {posts.map((post, index) => (
            <Box sx={{ marginBottom: 2, padding: 2, border: "1px solid #ddd", minWidth: "600px" }} key={index}>
              <Typography variant="h6">{post.author}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleClose} color="secondary">
            취소
          </Button>
          <Button onClick={handlePost} color="primary" variant="contained">
            게시
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
        <DialogTitle>로그인 필요</DialogTitle>
        <DialogContent>
          <Typography>로그인 후 사용하실 수 있습니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { posts as dbPosts } from "../database/db";
import AddPostDialog from "../components/AddPost";


const HomePage = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    setPosts([...dbPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
          <Box
            sx={{ marginBottom: 2, padding: 2, border: "1px solid #ddd", minWidth: "600px" }}
            key={index}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {post.title?.length > 30 ? `${post.title.slice(0, 30)}...` : post.title || "제목 없음"}
            </Typography>
        
            <Typography variant="body2" sx={{ margin: "8px 0" }}>
              {post.content?.length > 100 ? `${post.content.slice(0, 100)}...` : post.content || "내용 없음"}
            </Typography>
        
            <Typography variant="caption" color="textSecondary" sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>{post.author || "익명"}</span>
              <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "날짜 없음"}</span>
            </Typography>
          </Box>
        ))}

        </Box>
      </Box>

      <AddPostDialog
        open={open}
        onClose={handleClose}
        currentUser={currentUser}
        onPostAdded={handlePostAdded}
      />

      {loginDialogOpen && (
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
      )}
    </div>
  );
};

export default HomePage;

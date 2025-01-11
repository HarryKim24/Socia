/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { posts as dbPosts } from "../database/db";
import AddPostDialog from "../components/AddPost";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";

const HomePage = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [currentPosts, setCurrentPosts] = useState("전체 게시글");
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

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

  const navigateToHome = () => {
    if (!currentUser) {
      setLoginDialogOpen(true);
    } else {
      navigate("/home");
      setCurrentPosts("전체 게시글");
      setPosts([...dbPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  };

  const handleMyPosts = () => {
    if (!currentUser) {
      setLoginDialogOpen(true);
    } else {
      setCurrentPosts("내 글 보기");
      const myPosts = dbPosts.filter((post) => post.authorId === currentUser.id);
      setPosts(myPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  };

  const handleInfoDialogOpen = () => setInfoDialogOpen(true); 
  const handleInfoDialogClose = () => setInfoDialogOpen(false); 

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handlePostModalClose = () => {
    setSelectedPost(null);
  };

  return (
    <div style={{ backgroundColor: theme.palette.background.paper }}>
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
            onClick={navigateToHome}
          >
            홈
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
            onClick={handleMyPosts}
          >
            내 글
          </Button>
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
            onClick={handleInfoDialogOpen}
          >
            내 정보
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 4, marginLeft: "300px", height: "100%", overflowY: "auto" }}>
          <Typography variant="h5" sx={{ paddingBottom: 2, color: theme.palette.primary.main, fontWeight: 700 }}>
            {currentPosts}
          </Typography>
          {posts.map((post, index) => (
            <Box
              sx={{ marginBottom: 2, padding: 2, border: "1px solid #ddd", minWidth: "600px", backgroundColor: theme.palette.background.posts, cursor: "pointer" }}
              key={index}
              onClick={() => handlePostClick(post)}
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

{selectedPost && (
  <Dialog
    open={!!selectedPost}
    onClose={handlePostModalClose}
    PaperProps={{
      style: {
        width: '600px',
        height: '600px',
        maxWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.posts,
        color: theme.palette.text.primary,
      },
    }}
  >
    <Box
      sx={{
        flex: '0 0 auto',
        padding: 2,
        borderBottom: '1px solid #ddd',
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.posts,
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily }}>
        {selectedPost.title || "제목 없음"}
      </Typography>
    </Box>
    <Box
      sx={{
        flex: '1 1 auto',
        padding: 3,
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: 2, fontFamily: theme.typography.fontFamily }}>
        {selectedPost.content || "내용 없음"}
      </Typography>
    </Box>
    <Box
      sx={{
        flex: '0 0 auto',
        padding: 1,
        borderTop: '1px solid #ddd',
        fontSize: '0.875rem',
        color: theme.palette.secondary.main,
      }}
    >
      <Typography variant="caption">
        작성자: {selectedPost.author || "익명"}
        <br />
        작성일: {selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleString() : "날짜 없음"}
      </Typography>
    </Box>
    <DialogActions
      sx={{
        flex: '0 0 auto',
        padding: 1,
        borderTop: '1px solid #ddd',
      }}
    >
      <Button
        onClick={handlePostModalClose}
        color="primary"
        sx={{ fontWeight: theme.typography.fontWeightBold }}
      >
        닫기
      </Button>
    </DialogActions>
  </Dialog>
)}



      <UserInfo 
        currentUser={currentUser}
        open={infoDialogOpen}
        onClose={handleInfoDialogClose}
      />
    </div>
  );
};

export default HomePage;

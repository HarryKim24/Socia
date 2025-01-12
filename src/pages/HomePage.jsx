/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { posts as dbPosts } from "../database/db";
import AddPostDialog from "../components/AddPost";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HomePage = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [currentPosts, setCurrentPosts] = useState("전체 게시글");
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
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

  const handlePopularPosts = () => {
    const popularPosts = dbPosts.filter((post) => post.likes >= 10);
    setCurrentPosts("인기글");
    setPosts(popularPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }

  const handleInfoDialogOpen = () => setInfoDialogOpen(true); 
  const handleInfoDialogClose = () => setInfoDialogOpen(false); 

  const handlePostClick = (post) => setSelectedPost(post);

  const handlePostModalClose = () => setSelectedPost(null);

  const toggleLike = (postId) => {
    const updatedPost = { ...selectedPost };
    updatedPost.likes = updatedPost.liked ? updatedPost.likes - 1 : updatedPost.likes + 1;
    updatedPost.liked = !updatedPost.liked;
    setSelectedPost(updatedPost);
  
    const updatedDbPosts = dbPosts.map((post) =>
      post.id === postId ? updatedPost : post
    );
    
    dbPosts.length = 0;
    dbPosts.push(...updatedDbPosts);
    
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  const handleDeleteConfirmationOpen = () => setDeleteConfirmationDialogOpen(true);
  const handleDeleteConfirmationClose = () => setDeleteConfirmationDialogOpen(false);

  const handleDeletePost = (postId) => {
    const postIndex = dbPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      dbPosts.splice(postIndex, 1);
    }
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    setDeleteConfirmationDialogOpen(false); 
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
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }} onClick={navigateToHome}>
            홈
          </Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }} onClick={() => handleButtonClick(handlePopularPosts)}>
            인기글
          </Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }} onClick={handleMyPosts}>
            내 글
          </Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }} onClick={() => handleButtonClick(handleOpen)}>
            글쓰기
          </Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }} onClick={handleInfoDialogOpen}>
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
                <Typography sx={{ display: 'flex', flexDirection: 'column', fontSize: '12px', paddingTop: 1 }}>
                  <span>{post.author || "익명"}</span>
                  <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "날짜 없음"}</span>
                </Typography>
                <Typography sx={{ display: "flex", alignItems: "center", paddingTop: 2, fontSize: "14px", gap: 0.5 }}>
                  {post.liked ? <FavoriteIcon sx={{ fontSize: "20px", color: theme.palette.primary.main }} /> : <FavoriteBorderIcon sx={{ fontSize: "20px", color: theme.palette.primary.main }} />}
                  {post.likes || 0}
                </Typography>
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <AddPostDialog open={open} onClose={handleClose} currentUser={currentUser} onPostAdded={handlePostAdded} />

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
        backgroundColor: theme.palette.background.posts
      },
    }}
  >
    <Box sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
      <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
        {selectedPost.title || "제목 없음"}
      </Typography>
    </Box>
    <Box sx={{ padding: 3, overflowY: 'auto', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="body1" sx={{ minHeight: '398px' }}>
        {selectedPost.content || "내용 없음"}
      </Typography>
    </Box>
    <Box sx={{ padding: 1, borderTop: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="caption">
          {selectedPost.author || "익명"} | {new Date(selectedPost.createdAt).toLocaleString()}
        </Typography>
        <Button onClick={() => toggleLike(selectedPost.id)}>
          {selectedPost.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {selectedPost.likes || 0}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handlePostModalClose}>닫기</Button>
        {selectedPost.authorId === currentUser?.id && (
          <Button color="error" onClick={handleDeleteConfirmationOpen}>
            삭제
          </Button>
        )}
      </Box>
    </Box>
  </Dialog>
)}

<Dialog open={deleteConfirmationDialogOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>게시글 삭제</DialogTitle>
        <DialogContent>
          <Typography>정말로 이 게시글을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="secondary">취소</Button>
          <Button 
            onClick={() => handleDeletePost(selectedPost.id)} 
            color="error"
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      <UserInfo currentUser={currentUser} open={infoDialogOpen} onClose={handleInfoDialogClose} />
    </div>
  );
};

export default HomePage;

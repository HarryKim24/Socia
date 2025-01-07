import { Box, Button, Typography } from '@mui/material';
import TopBar from "../components/Topbar";

const HomePage = () => {
  return (
    <div>
      <TopBar />
      <Box sx={{ display: 'flex' }}>
        <Box 
          sx={{ 
            width: '300px', 
            height: '100vh',
            display: 'flex', 
            flexDirection: 'column', 
            borderRight: '1px solid #ddd',
            paddingTop: 4,
            position: 'fixed',
            left: 0,
            backgroundColor: 'background.default',
          }}
        >
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}>인기글</Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}>내 글</Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}>내 댓글</Button>
          <Button fullWidth sx={{ marginBottom: 2, fontWeight: 700, fontSize: 16 }}>내 정보</Button>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 4, marginLeft: '300px', height: '100%', overflowY: 'auto' }}>
          {/* 게시글들 로드 예시 */}
          {Array.from({ length: 10 }, (_, index) => (
            <Box sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', minWidth: '600px' }} key={index}>
              <Typography variant="h6">게시글 제목 {index + 1}</Typography>
              <Typography variant="body1">게시글 내용 {index + 1}...</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;

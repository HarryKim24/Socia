import { useState } from 'react';
import { TextField, Button, Typography, Box, Link, ThemeProvider } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';  // styled-components ThemeProvider 임포트
import theme from '../styles/theme';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 아이디 또는 비밀번호 잘못 입력시 '아이디 또는 비밀번호를 잘못 입력했습니다' 메세지 

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // 로그인 로직
    console.log('로그인 성공:', email, password);
    setError(null);

    // 로그인 후 리디렉션 등 추가 작업
  };

  return (
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <FullPageWrapper>
          <FormWrapper>
            <Typography variant="h4" gutterBottom>
              로그인
            </Typography>

            {error && (
              <Typography color="error" variant="body2" align="center" marginBottom={2}>
                {error}
              </Typography>
            )}

            <TextField
              label="이메일"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
            />

            <TextField
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              로그인
            </Button>

            <Box marginTop={2}>
              <Typography variant="body2" align="center">
                아직 회원이 아니신가요?{' '}
                <Link href="/signup" variant="body2">
                  회원가입
                </Link>
              </Typography>
            </Box>
          </FormWrapper>
        </FullPageWrapper>
      </ThemeProvider>
    </StyledThemeProvider>
  );
};

const FullPageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};  /* 테마의 배경 색상 사용 */
`;

const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export default LoginPage;

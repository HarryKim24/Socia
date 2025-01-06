import { useState } from 'react';
import { TextField, Button, Typography, Box, Link, ThemeProvider, FormControlLabel, Checkbox } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { users } from '../database/db';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태 추가
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('이메일 또는 비밀번호를 입력해주세요.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
      return;
    }
    setError(null);
    navigate('/home');
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              type={showPassword ? 'text' : 'password'} // 비밀번호 보이기 상태에 따라 타입 변경
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleToggleShowPassword} // 체크박스 클릭 시 비밀번호 보이기 상태 토글
                  color="primary"
                />
              }
              label="비밀번호 보이기"
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
  background-color: ${({ theme }) => theme.palette.background.default};
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

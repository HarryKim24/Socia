/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TextField, Button, Typography, Box, Link, ThemeProvider, FormControlLabel, Checkbox } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import theme from '../styles/theme';
import { users } from '../database/db';
import CryptoJS from 'crypto-js'; 

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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

    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    const user = users.find((u) => u.email === email && u.password === hashedPassword);

    if (!user) {
      setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
      return;
    }

    setError(null);
    setCurrentUser(user);
    navigate('/home');
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <FullPageWrapper>
          <LogoWrapper>
            <InstagramIcon color="primary" sx={{ fontSize: 50, marginRight: 1 }} />
            <Typography variant="h4" color="primary" fontWeight="bold">
              SOCIA
            </Typography>
          </LogoWrapper>

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
              type={showPassword ? 'text' : 'password'}
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
                  onChange={handleToggleShowPassword}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const LogoWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
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

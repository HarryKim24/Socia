import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, ThemeProvider, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox, Link } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import theme from '../styles/theme';
import { addUser, users } from '../database/db';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (email === '' || password === '' || name === '') {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (name.length > 8) {
      setError('이름은 최대 8글자까지 입력 가능합니다.');
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
  
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
    if (!passwordRegex.test(password)) {
      setError('비밀번호는 8~64자 사이의 영문과 숫자가 포함되어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError('이미 등록된 이메일 주소입니다.');
      return;
    }

  
    addUser({ email, password, name });
    setError(null);
    setSuccess('회원가입이 완료되었습니다!');
    setOpenModal(true);
  
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate('/login');
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
              회원가입
            </Typography>

            {error && (
              <Typography color="error" variant="body2" align="center" marginBottom={2}>
                {error}
              </Typography>
            )}

            {success && (
              <Typography color="primary" variant="body2" align="center" marginBottom={2}>
                {success}
              </Typography>
            )}

            <TextField
              label="이름"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />

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

            <TextField
              label="비밀번호 확인"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={handleSignup}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              회원가입
            </Button>

            <Box marginTop={2}>
              <Typography variant="body2" align="center">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" variant="body2">
                  로그인
                </Link>
              </Typography>
            </Box>
          </FormWrapper>
        </FullPageWrapper>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>회원가입 성공</DialogTitle>
          <DialogContent>
            <Typography variant="body1" align="center">
              회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              확인
            </Button>
          </DialogActions>
        </Dialog>
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

export default SignupPage;

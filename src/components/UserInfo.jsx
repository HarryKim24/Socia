/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField } from "@mui/material";
import { users } from "../database/db";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ currentUser, open, onClose }) => {
  const [password, setPassword] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const user = users.find((user) => user.id === currentUser.id && user.password === password);
    if (user) {
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex > -1) {
        users.splice(userIndex, 1);
      }
      setAlertMessage("회원 탈퇴가 완료되었습니다.");
      setAlertDialogOpen(true);
    } else {
      setAlertMessage("비밀번호가 일치하지 않습니다.");
    }
    setPassword("");
  };

  const handleAlertClose = () => {
    setAlertDialogOpen(false);
    onClose();
    navigate('/login');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle color="primary" sx={{ fontWeight: 700 }}>내 정보</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 700 }}>이름: {currentUser.name}</Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 700 }}>이메일: {currentUser.email}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" sx={{ fontWeight: 700 }}>
            닫기
          </Button>
          <Button onClick={handleDeleteAccount} color="error" sx={{ fontWeight: 700 }}>
            회원 탈퇴
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle color="primary" sx={{ fontWeight: 700 }}>회원 탈퇴 확인</DialogTitle>
        <DialogContent>
          <Typography color="secondary" sx={{ fontWeight: 700 }}>현재 비밀번호를 입력하세요.</Typography>
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="dense"
            label="비밀번호"
          />
          {alertMessage && (
            <Typography color="error" variant="body2" style={{ marginTop: 10 }}>
              {alertMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDeleteDialogOpen(false); setAlertMessage('');}} color="primary" sx={{ fontWeight: 700 }}>
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="error" sx={{ fontWeight: 700 }}>
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={alertDialogOpen} onClose={handleAlertClose}>
        <DialogTitle color="secondary" sx={{ fontWeight: 700 }}>알림</DialogTitle>
        <DialogContent>
          <Typography color="primary" sx={{ fontWeight: 700 }}>{alertMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary" sx={{ fontWeight: 700 }}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfo;

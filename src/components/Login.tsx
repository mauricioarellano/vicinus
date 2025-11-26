import { useState } from "react";
import { useLogin, useNotify, useTranslate } from "react-admin";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const LoginContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "url('/login-background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 0,
  },
}));

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: "100%",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  position: "relative",
  zIndex: 1,
  backgroundColor: "#ffffff",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiInputLabel-root": {
    color: "#000000",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    color: "#000000",
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    color: "#000000",
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #ffffff inset",
      WebkitTextFillColor: "#000000",
      caretColor: "#000000",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  },
  transition: "all 0.3s ease",
}));

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password }).catch(() => {
      notify(translate("ra.auth.sign_in_error"), { type: "error" });
    });
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <LoginCard>
          <LogoContainer>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: (theme) => theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Lock sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight={700}
              color="black"
            >
              {translate("ra.auth.welcome")}
            </Typography>
            <Typography variant="body2" color="black">
              {translate("ra.auth.tagline")}
            </Typography>
          </LogoContainer>

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label={translate("ra.auth.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label={translate("ra.auth.password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label={translate(
                        "ra.auth.toggle_password_visibility",
                      )}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              {translate("ra.action.sign_in")}
            </StyledButton>
          </form>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};

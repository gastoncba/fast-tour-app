import { useState } from "react";
import { Grid, Box, InputAdornment, IconButton } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Paragraph, Wrapper, Divider, Input, Button, Icon, showToast } from "../../components";
import { userProvider } from "../../providers";

interface Recovery {}

export const RecoveryScreen: React.FC<Recovery> = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [reenteredPassword, setReenteredPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showReenteredPassword, setShowReenteredPassword] = useState<boolean>(false);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const changePassword = async () => {
    setLoadingPassword(true);
    const token = searchParams.get("token");
    if (token) {
      try {
        await userProvider.changePassword(token, newPassword);
        showToast({ message: "Constraseña cambiada con éxito", type: "success" });
        setTimeout(() => {
          navigate("/app/auth");
        }, 3000);
      } catch (error) {
        showToast({ message: "Error al intentar cambiar constraseña", type: "error" });
      } finally {
        setLoadingPassword(false);
      }
    } else {
      showToast({ message: "Debe tener un token", type: "error" });
      setLoadingPassword(false);
    }
  };

  const endAdornment = (show: boolean, handleClickShowPassword: () => void, handleMouseDownPassword: () => void): JSX.Element => (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
        {show ? <Icon type="VISIBILITY" /> : <Icon type="VISIBILITY-OFF" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
        <Wrapper sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Paragraph text={"Cambio de Constraseña"} sx={{ px: 1 }} variant="h5" color="primary" />
            <Divider />
            <Grid container spacing={2} sx={{ py: 2 }}>
              <Grid item xs={12}>
                <Input
                  label="Nueva constraseña"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  setValue={(value) => setNewPassword(value)}
                  fullWidth
                  InputProps={{
                    endAdornment: endAdornment(
                      showNewPassword,
                      () => setShowNewPassword(!showNewPassword),
                      () => setShowNewPassword(!showNewPassword)
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Reingresar Contraseña"
                  type={showReenteredPassword ? "text" : "password"}
                  value={reenteredPassword}
                  setValue={(value) => {
                    setReenteredPassword(value);
                    setNewPasswordError(value !== newPassword);
                  }}
                  error={newPasswordError}
                  helperText={newPasswordError && "Las constraseñas no coinciden"}
                  fullWidth
                  InputProps={{
                    endAdornment: endAdornment(
                      showReenteredPassword,
                      () => setShowReenteredPassword(!showNewPassword),
                      () => setShowReenteredPassword(!showNewPassword)
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Button title="Cambiar Contraseña" disabled={newPasswordError || newPassword === "" || reenteredPassword === "" || loadingPassword} onClick={changePassword} />
        </Wrapper>
      </Grid>
    </Grid>
  );
};

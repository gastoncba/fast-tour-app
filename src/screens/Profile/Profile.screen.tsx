import { Box } from "@mui/material";
import { Divider, Heading, Paragraph, Wrapper } from "../../components";
import { userProvider } from "../../providers";

interface ProfileProps {}

export const ProfileScreen: React.FC<ProfileProps> = () => {
  return (
    <>
      <Heading title="Perfil" />
      <Wrapper sx={{ p: 2, my: 2 }}>
        <Box>
          <Paragraph text={userProvider.user.firstName} variant="h5" />
          <Divider />
        </Box>
      </Wrapper>
    </>
  );
};

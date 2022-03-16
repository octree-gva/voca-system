import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Layout from './centered';

import {DefaultProps} from './default';

export type AuthProps = React.PropsWithChildren<DefaultProps>;

const Auth = ({children, ...layoutProps}: AuthProps) => {
  return (
    <Layout {...layoutProps}>
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{p: 2}}>
          <AuthForm>
            <Typography variant="h3" align="center">
              VocaCity
            </Typography>
            {children}
          </AuthForm>
        </Paper>
      </Container>
    </Layout>
  );
};

const AuthForm = styled(Box)(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export default Auth;

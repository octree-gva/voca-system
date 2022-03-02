import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Logo from '../components/Logo';
import Layout from './centered';

import {DefaultProps} from './default';

export type AuthProps = React.PropsWithChildren<DefaultProps>;

const Auth = ({children, ...layoutProps}: AuthProps) => {
  return (
    <Layout {...layoutProps}>
      <Container maxWidth="xs">
        <Paper elevation={4}>
          <AuthForm>
            <Logo width={240} height={64} />
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

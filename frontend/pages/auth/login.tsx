import {Typography, Button, Container, Paper, Box} from '@mui/material';
import {signOut, useSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {useMemo} from 'react';
import Link from 'next/link';
import LoginForm from '../../containers/forms/LoginForm';
import Logo from '../../components/Logo';
import Layout from '../../layouts/Centered';

export type SignInProps = {csrfToken: string};
export type SignInPayload = {
  identifier: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
};

export default function SignIn() {
  const {t} = useTranslation(undefined, {keyPrefix: 'auth'});
  const session = useSession();
  const isLoggedIn = useMemo(
    () => session.status === 'authenticated',
    [session]
  );
  const accountId = session?.data?.user?.administratorAccounts[0].id;

  return (
    <Layout publicAccess>
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{p: 2}}>
          <AuthForm>
            <Logo height={30} width={120} />
            {isLoggedIn ? (
              <AlreadyLoggedIn>
                <Typography
                  variant="overline"
                  color="textSecondary"
                  align="center"
                >{t`login.title`}</Typography>
                <Typography>{t`login.alreadyIn.content`}</Typography>
                <Button
                  onClick={() => signOut({callbackUrl: '/auth/login'})}
                >{t`login.alreadyIn.goLogout`}</Button>
                <Link href={`/${accountId}/dashboard`} passHref>
                  <Button variant="contained">{t`login.alreadyIn.goToDashboard`}</Button>
                </Link>
              </AlreadyLoggedIn>
            ) : (
              <LoginForm />
            )}
          </AuthForm>
        </Paper>
      </Container>
    </Layout>
  );
}

const AlreadyLoggedIn = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AuthForm = styled(Box)(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

import {Typography, Button} from '@mui/material';
import {signOut, useSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/auth';
import {styled} from '@mui/material/styles';
import {useMemo} from 'react';
import Link from 'next/link';
import LoginForm from '../../containers/forms/LoginForm';

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

  return (
    <Layout publicAccess>
      {isLoggedIn ? (
        <AlreadyLoggedIn>
          <Typography
            variant="overline"
            color="textSecondary"
            align="center"
          >{t`login.title`}</Typography>
          <Typography>{t`login.alreadyIn.content`}</Typography>
          <Button
            onClick={() => signOut()}
          >{t`login.alreadyIn.goLogout`}</Button>
          <Link href="/dashboard" passHref>
            <Button
              variant="contained"
            >{t`login.alreadyIn.goToDashboard`}</Button>
          </Link>
        </AlreadyLoggedIn>
      ) : (
        <LoginForm />
      )}
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

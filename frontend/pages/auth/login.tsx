import {Typography, Button} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/auth';
import {styled} from '@mui/material/styles';
import {useMemo} from 'react';
import LogoutButton from '../../components/LogoutButton';
import Link from 'next/link';
import {LoginForm} from '../../forms';

const AlreadyLoggedIn = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

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
          <LogoutButton
            variant="outlined"
            color="primary"
          >{t`login.alreadyIn.goLogout`}</LogoutButton>
          <Link href="/dashboard" passHref>
            <Button
              variant="contained"
              color="primary"
            >{t`login.alreadyIn.goToDashboard`}</Button>
          </Link>
        </AlreadyLoggedIn>
      ) : (
        <LoginForm />
      )}
    </Layout>
  );
}

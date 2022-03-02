import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Layout from '../layouts/centered';
import {useSession} from 'next-auth/react';
import {useMemo} from 'react';
import LogoutButton from '../components/LogoutButton';
import CreateFirstInstanceForm from '../forms/CreateFirstInstanceForm';
import {useConfigurationQuery} from '../graphql/hooks';

const Home = () => {
  const session = useSession();
  const status = useMemo(() => session.status, [session]);
  const configuration = useConfigurationQuery();
  return (
    <Layout publicAccess noRedirect>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Voca.City
          </Typography>
          {status === 'authenticated' ? (
            <LogoutButton color="inherit">Log Out</LogoutButton>
          ) : (
            <Link href="/auth/login" passHref>
              <Button color="inherit">Log In</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Card>
        <CardHeader title="welcome to voca.city" />
        <CardContent>
          <CreateFirstInstanceForm />
        </CardContent>
        {status === 'authenticated' ? (
          <Link href="/dashboard" passHref>
            <CardActionArea>
              <Button>Dashboard</Button>
            </CardActionArea>
          </Link>
        ) : (
          <Link href="/register" passHref>
            <CardActionArea>
              <Button>Register</Button>
            </CardActionArea>
          </Link>
        )}
      </Card>
      <pre>
        {JSON.stringify({
          isLoading: configuration.loading,
          data: configuration.data,
          error: ('' + configuration.error).substring(0, 30),
        })}
      </pre>
    </Layout>
  );
};

export default Home;

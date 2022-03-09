import {
  AppBar,
  Button,
  Card,
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

const Home = () => {
  const session = useSession();
  const status = useMemo(() => session.status, [session]);
  return (
    <Layout
      publicAccess
      noRedirect
      header={
        <AppBar position="static">
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
      }
    >
      <Card sx={{maxWidth: 560, width: '98%'}}>
        <CardHeader title="Discover voca.city" />
        <CardContent>
          <CreateFirstInstanceForm>
            {status === 'authenticated' ? (
              <Link href="/dashboard" passHref>
                <Button variant="contained">Dashboard</Button>
              </Link>
            ) : (
              <Button type="submit" variant="contained">
                Register
              </Button>
            )}
          </CreateFirstInstanceForm>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Home;

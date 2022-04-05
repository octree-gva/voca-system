import {Button, Card, CardContent, CardHeader} from '@mui/material';
import Link from 'next/link';
import CreateFirstInstanceForm from '../../containers/CreateFirstInstance';
import {useMemo} from 'react';
import EmbedLayout from '../../layouts/embed';
import {useSession} from 'next-auth/react';

const Home = () => {
  const session = useSession();
  const status = useMemo(() => session.status, [session]);
  return (
    <EmbedLayout publicAccess noRedirect>
      <Card sx={{maxWidth: 560, width: '98%', margin: '0 auto', overflow: 'auto'}}>
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
    </EmbedLayout>
  );
};

export default Home;

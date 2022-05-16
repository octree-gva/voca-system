import Button from '@mui/material/Button';
import Link from 'next/link';
import Signup from '../../containers/Signup';
import {useMemo} from 'react';
import EmbedLayout from '../../layouts/Embed';
import {useSession} from 'next-auth/react';

const Home = () => {
  const session = useSession();
  const status = useMemo(() => session.status, [session]);
  const accountId = session?.data?.user?.administratorAccounts[0].id;
  return (
    <EmbedLayout publicAccess noRedirect>
      <Signup>
        {status === 'authenticated' ? (
          <Link href={`/${accountId}/dashboard`} passHref>
            <Button variant="contained">Dashboard</Button>
          </Link>
        ) : (
          <Button type="submit" variant="contained">
            Register
          </Button>
        )}
      </Signup>
    </EmbedLayout>
  );
};

export default Home;

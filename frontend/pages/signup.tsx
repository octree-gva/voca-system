import {useMemo} from 'react';
import Link from 'next/link';
import {Button} from '@mui/material';
import {getSession, useSession} from 'next-auth/react';
import {GetServerSideProps} from 'next';
import Signup from '../containers/Signup';
import TopBar from '../containers/TopBar';
import SupportButton from '../containers/SupportButton';
import Layout from '../layouts/Centered';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const session = useSession();
  const {t} = useTranslation();
  const status = useMemo(() => session.status, [session]);
  const accountId = session?.data?.user?.administratorAccounts[0].id;
  return (
    <Layout publicAccess noRedirect header={<TopBar />}>
      <Signup>
        {status === 'authenticated' ? (
          <Link href={`/${accountId}/dashboard`} passHref>
            <Button variant="contained">{t('register.dashboard')}</Button>
          </Link>
        ) : (
          <Button type="submit" variant="contained">
            {t('register.submit')}
          </Button>
        )}
      </Signup>
      <SupportButton />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({req: context.req});
  const accountId = session?.data?.user?.administratorAccounts[0].id;
  if (!!session?.user)
    return {
      redirect: {
        permanent: false,
        destination: `${accountId}/dashboard`,
      },
    };
  return {
    props: {session},
  };
};
export default Home;

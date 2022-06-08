import {getSession} from 'next-auth/react';
import {GetServerSideProps} from 'next';
import Signup from '../containers/Signup';
import TopBar from '../containers/TopBar';
import SupportButton from '../containers/SupportButton';
import Layout from '../layouts/Centered';

const Home = () => {
  return (
    <Layout publicAccess noRedirect header={<TopBar />}>
      <Signup />
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

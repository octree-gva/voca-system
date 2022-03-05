import {useSession} from 'next-auth/react';
import DefaultLayout from '../layouts/default';
const Dashboard = () => {
  const session = useSession();
  return <DefaultLayout>{JSON.stringify(session)}</DefaultLayout>;
};
export default Dashboard;

import Button from '@mui/material/Button';
import ConnectedLayout from '../layouts/connected';
import InstancesList from '../containers/InstancesList';

const Dashboard = () => {
  return (
    <ConnectedLayout
      headerActions={<Button color="inherit">create new</Button>}
    >
      <InstancesList />
    </ConnectedLayout>
  );
};

export default Dashboard;

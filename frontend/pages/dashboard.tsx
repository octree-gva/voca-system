import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import ConnectedLayout from '../layouts/connected';
import InstancesList from '../containers/InstancesList';

const Dashboard = () => {
  return (
    <ConnectedLayout
      headerActions={<Box p={2}><Button>create new</Button></Box>}
    >
      <InstancesList />
    </ConnectedLayout>
  );
};

export default Dashboard;

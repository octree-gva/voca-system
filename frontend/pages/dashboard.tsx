import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import ConnectedLayout from '../layouts/connected';
import InstancesList from '../containers/InstancesList';
import SupportButton from '../containers/SupportButton';

const Dashboard = () => {
  return (
    <ConnectedLayout
      headerActions={<Box p={2}><Button>create new</Button></Box>}
    >
      <InstancesList />
      <SupportButton/>
    </ConnectedLayout>
  );
};

export default Dashboard;

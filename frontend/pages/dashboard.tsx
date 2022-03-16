import TopBar from '../containers/TopBar';
import DefaultLayout from '../layouts/default';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LeftBar from '../containers/LeftBar';
import InstancesList from '../containers/InstancesList';
import SupportButton from '../containers/SupportButton';

const Dashboard = () => {

  return (
    <DefaultLayout>
      <Box pt="64px">
        <TopBar>
          <Button color="inherit">create new</Button>
        </TopBar>
        <Box sx={{pl: {xs: 0, sm: '80px'}, pb: {xs: '64px', sm: 0}}}>
          <LeftBar />
          <InstancesList/>
        </Box>
      </Box>
      <SupportButton/>
    </DefaultLayout>
  );
};

export default Dashboard;

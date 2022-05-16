import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import ConnectedLayout from '../../layouts/AppLayout';
import InstancesList from '../../containers/InstancesList';
import {useState} from 'react';
import CreateInstance from '../../containers/CreateInstance';
import {useTranslation} from 'react-i18next';

const Dashboard = () => {
  const [isCreatingInstance, createInstance] = useState(false);
  const {t} = useTranslation(undefined, {keyPrefix: 'Dashboard'});
  return (
    <ConnectedLayout
      headerActions={
        <Box p={2}>
          <Button
            disabled={isCreatingInstance}
            onClick={() => createInstance(true)}
          >
            {t('createInstance')}
          </Button>
        </Box>
      }
    >
      <InstancesList />
      <CreateInstance
        open={isCreatingInstance}
        onClose={() => createInstance(false)}
      />
    </ConnectedLayout>
  );
};

export default Dashboard;

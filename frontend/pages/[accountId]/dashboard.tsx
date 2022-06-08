import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import ConnectedLayout from '../../layouts/AppLayout';
import InstancesList from '../../containers/InstancesList';
import {useState} from 'react';
import CreateInstance from '../../containers/CreateInstance';
import {useTranslation} from 'react-i18next';
import Loader from '../../components/Loader';
import useToastStore from '../../stores/useToastStore';
import {useInstancesQuery} from '../../graphql/hooks';
import Tooltip from '@mui/material/Tooltip';
import {BannerProps} from '../../components/Banner';

const Dashboard = () => {
  const [isCreatingInstance, createInstance] = useState(false);
  const {data: {instances} = {}, loading, error} = useInstancesQuery();
  const addToast = useToastStore(s => s.addToast);
  const {t} = useTranslation(undefined, {keyPrefix: 'Dashboard'});
  const defaultBanner = {open: false, message: ''};
  const [banner, setBanner] = useState<BannerProps>(defaultBanner);

  const {data} = instances ?? {data: []};

  if (error) {
    addToast(error.message);
  }

  const tooltipText = data.length >= 5 ? t('createInstance.limit') : '';

  return (
    <ConnectedLayout
      banner={{...banner, onClear: () => setBanner(defaultBanner)}}
      headerActions={
        <Tooltip title={tooltipText} placement="left">
          <Box p={2}>
            <Button
              disabled={loading || data.length >= 5 || isCreatingInstance}
              onClick={() => createInstance(true)}
            >
              {t('createInstance')}
            </Button>
          </Box>
        </Tooltip>
      }
    >
      {loading ? <Loader /> : <InstancesList instances={data} />}
      <CreateInstance
        open={isCreatingInstance}
        onClose={() => {
          createInstance(false);
          if (data.length >= 4)
            setBanner({open: true, message: t('createInstance.limit')});
        }}
      />
    </ConnectedLayout>
  );
};

export default Dashboard;

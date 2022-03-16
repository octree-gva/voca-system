import Grid from '@mui/material/Grid';
import {useInstancesQuery} from '../../graphql/hooks';
import Loader from '../../components/Loader';
import useToastStore from '../../stores/useToastStore';
import InstanceCard from './InstanceCard';

const InstancesList = () => {
  const {
    data: {instances: {data} = {data: []}} = {},
    loading,
    error,
  } = useInstancesQuery();
  const addToast = useToastStore(s => s.addToast);

  if (loading) return <Loader />;
  if (error) {
    addToast(error.message);
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 1080,
        margin: {xs: '0', md: '28px auto'},
      }}
    >
      {data.map(instance => (
        <Grid item sx={{pl: '0 !important'}} xs={12} sm={12} md={6} lg={4}>
          <InstanceCard {...instance.attributes} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InstancesList;
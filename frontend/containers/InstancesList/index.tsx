import Grid from '@mui/material/Grid';
import {InstanceEntity} from '../../graphql/hooks';
import InstanceCard from './InstanceCard';

interface Props {
  instances: Array<InstanceEntity>;
}

const InstancesList = ({instances}: Props) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 1080,
        margin: {xs: '0', md: '28px auto'},
        pb: 16,
      }}
    >
      {instances.map(instance => (
        <Grid
          key={instance.id}
          item
          sx={{pl: '0 !important'}}
          xs={12}
          sm={12}
          md={6}
          lg={4}
        >
          <InstanceCard {...instance} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InstancesList;

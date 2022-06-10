import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import {useTranslation} from 'react-i18next';
import {InstanceEntity} from '../../graphql/hooks';
import InstanceStatus from './InstanceStatus';
import Button from '@mui/material/Button';
import router from 'next/router';

const InstanceCard = (instance: InstanceEntity) => {
  const {t} = useTranslation();
  const {title} = instance.attributes || {};

  return (
    <Card sx={{m: 1}}>
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography component="span" variant="h4">
            {title}
          </Typography>
          <Chip color="success" icon={<CheckIcon />} label="0.24" />
        </Box>
        <InstanceStatus {...instance} />
      </CardContent>
      <Divider sx={{marginInline: 1}} />
      <CardActions sx={{justifyContent: 'end'}}>
        <Button
          sx={{
            fontWeight: 'bold',
            textTransform: 'initial',
          }}
          component="a"
        >
          {t('InstanceCard.upgrade')}
        </Button>
        <Button
          sx={{
            fontWeight: 'bold',
            textTransform: 'initial',
          }}
          component="a"
          onClick={() =>
            router.push(`/instance/${instance.id}/configuration`, undefined, {
              shallow: true,
            })
          }
        >
          {t('InstanceCard.settings')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default InstanceCard;

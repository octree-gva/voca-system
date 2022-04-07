import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import {useTranslation} from 'react-i18next';
import ActionButton from './ActionButton';
import {Instance} from '../../graphql/hooks';
import InstanceStatus from './InstanceStatus';

const InstanceCard = (instance: Instance) => {
  const {t} = useTranslation();
  const {title} = instance;

  return (
    <Card sx={{m: 1}}>
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography component="span" variant="h5">
            {title}
          </Typography>
          <Chip
            color="success"
            icon={<CheckIcon />}
            label="0.24"
            variant="outlined"
          />
        </Box>
        <InstanceStatus {...instance} />
      </CardContent>
      <Divider sx={{marginInline: 1}} />
      <CardActions sx={{justifyContent: 'end'}}>
        <ActionButton>{t('InstanceCard.upgrade')}</ActionButton>
        <ActionButton>{t('InstanceCard.settings')}</ActionButton>
      </CardActions>
    </Card>
  );
};

export default InstanceCard;

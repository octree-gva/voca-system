import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserFields from './AccountForm';
import UserInfo from './UserInfo';

const AccountInfo = () => {
  const {t} = useTranslation();
  const [isEditing, setEditing] = useState<boolean>(false);
  const UserSection = isEditing ? UserFields : UserInfo;

  return (
    <Paper sx={{p: 3}}>
      <UserSection setEditing={setEditing} />
      <Box sx={{justifyContent: 'space-between', p: 3}}>
        <Box sx={{width: '50%', display: 'inline-block'}}>
          <Typography
            variant="h6"
            sx={{
              color: 'ThreeDDarkShadow',
              fontWeight: 'bold',
              fontSize: '.875rem',
            }}
          >
            {t('account.plan')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme => theme.palette.success.main,
              fontWeight: 'bold',
            }}
          >
            {t('plans.standard')}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'inline-block',
            textAlign: 'right',
            verticalAlign: 'bottom',
          }}
        >
          <Chip
            label={t('generic.coming_soon')}
            size="small"
            color="success"
            variant="outlined"
            sx={{marginRight: '1em'}}
          />
          <Button
            size="small"
            sx={{color: 'ThreeDDarkShadow', fontWeight: 'bold'}}
          >
            {t('account.change_plan')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AccountInfo;

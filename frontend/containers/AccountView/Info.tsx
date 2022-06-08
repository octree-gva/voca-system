import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserFields from './AccountForm';
import UserInfo from './UserInfo';

const AccountInfo = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [isEditing, setEditing] = useState<boolean>(false);
  const UserSection = isEditing ? UserFields : UserInfo;

  return (
    <Paper sx={{p: 0}}>
      <UserSection setEditing={setEditing} />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 6,
          [theme.breakpoints.down(420)]: {p: 0},
        }}
      >
        <Box sx={{display: 'inline-block'}}>
          <Typography variant="h6">{t('account.plan')}</Typography>
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
            display: 'inline-block',
            [theme.breakpoints.down(420)]: {
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column-reverse',
            },
          }}
        >
          <Chip
            label={t('generic.coming_soon')}
            color="success"
            sx={{
              marginRight: '1em',
              [theme.breakpoints.down(420)]: {
                marginRight: 0,
              },
            }}
          />
          <Button
            variant="text"
            sx={{
              fontWeight: 'bold',
              fontSize: 'h6',
              verticalAlign: 'top',
              padding: 0,
              color: theme => theme.palette.primary.light,
            }}
          >
            {t('account.change_plan')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AccountInfo;

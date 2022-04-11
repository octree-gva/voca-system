import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import {useTranslation} from 'react-i18next';
import {useProfileQuery} from '../../graphql/hooks';

const UserInfo = ({setEditing}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {data} = useProfileQuery();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 3,
          [theme.breakpoints.down(420)]: {
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{display: 'inline-block'}}>
          <Typography variant="h5">
            {data?.me?.firstName} {data?.me?.lastName}
          </Typography>
          <Typography
            variant="overline"
            sx={{color: theme => theme.palette.primary.main}}
          >
            {data?.me?.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-block',
            verticalAlign: 'top',
          }}
        >
          <Button sx={{fontWeight: 'bold'}} onClick={() => setEditing(true)}>
            {t('account.change')}
          </Button>
        </Box>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', p: 3}}>
        <Box sx={{display: 'inline-block'}}>
          <Typography variant="h6">{t('account.password')}</Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme => theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            **********
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-block',
            textAlign: 'right',
          }}
        >
          <Button
            variant="text"
            href="/auth/lost-password"
            sx={{
              fontWeight: 'bold',
              verticalAlign: 'top',
              fontSize: 'h6',
              textAlign: 'right',
              padding: 0,
            }}
          >
            {t('account.forgot_password')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;

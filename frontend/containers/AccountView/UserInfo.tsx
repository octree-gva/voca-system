import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {useProfileQuery} from '../../graphql/hooks';

const UserInfo = ({setEditing}) => {
  const {t} = useTranslation();
  const {data} = useProfileQuery();

  return (
    <>
      <Box sx={{justifyContent: 'space-between', p: 3}}>
        <Box sx={{width: '50%', display: 'inline-block'}}>
          <Typography variant="h5">
            {data?.me?.firstName} {data?.me?.lastName}
          </Typography>
          <Typography
            variant="overline"
            sx={{color: theme => theme.palette.info.main}}
          >
            {data?.me?.email}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'inline-block',
            textAlign: 'right',
            verticalAlign: 'top',
          }}
        >
          <Button color="primary" sx={{fontWeight: 'bold'}} onClick={() => setEditing(true)}>
            {t('account.change')}
          </Button>
        </Box>
      </Box>
      <Box sx={{justifyContent: 'space-between', p: 3}}>
        <Box sx={{width: '50%', display: 'inline-block'}}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '.875rem',
            }}
          >
            {t('account.password')}
          </Typography>
          <Typography
            variant="body2"
            sx={{color: theme => theme.palette.info.main, fontWeight: 'bold'}}
          >
            **************
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
          <Button
            size="small"
            href="/auth/lost-password"
            sx={{fontWeight: 'bold'}}
          >
            {t('account.forgot_password')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;

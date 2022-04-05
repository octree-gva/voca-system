import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import AccountInfo from './Info';

const AccountView = () => {
  const router = useRouter();
  const theme = useTheme();
  const {t} = useTranslation();

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
      <Grid item sx={{pl: '0 !important'}} xs={6} sm={4}>
        <Button onClick={router.back} variant="outlined" color="info">
          <ArrowBackRoundedIcon sx={{mr: 1}} />
          {t('account.back')}
        </Button>
      </Grid>
      <Grid item sx={{pl: '0 !important'}} xs={6} sm={8}>
        <Typography
          variant="h4"
          sx={{pl: 7, [theme.breakpoints.down('md')]: {pl: '0 !important'}}}
        >
          {t('account.title')}
        </Typography>
      </Grid>
      <Grid item sx={{pl: '0 !important'}} xs={12}>
        <AccountInfo />
      </Grid>
    </Grid>
  );
};

export default AccountView;

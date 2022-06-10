import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {InstanceEntity, useInstanceQuery} from '../../graphql/hooks';

const tabs = [
  {
    disabled: false,
    titleKey: 'instance.nav.configuration',
    route: 'configuration',
  },
  {disabled: true, titleKey: 'instance.nav.modules', route: 'modules'},
  {disabled: true, titleKey: 'instance.nav.billing', route: 'billing'},
  {disabled: true, titleKey: 'instance.nav.advanced', route: 'advanced'},
];

export type InstanceSettingsPage = ({
  instance,
}: {
  instance: InstanceEntity;
}) => JSX.Element;

const InstanceSettingsLayout = ({
  Component,
}: {
  Component: InstanceSettingsPage;
}): JSX.Element => {
  const {
    query: {instanceId},
    asPath,
    back,
    push,
  } = useRouter();
  const theme = useTheme();
  const {t} = useTranslation();

  const {data, loading, error} = useInstanceQuery({
    variables: {id: instanceId as string},
  });

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  if (loading) {
    return (
      <Box p={3}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  const route = asPath.split('/');
  const baseRoute = route.slice(0, route.length - 1).join('/');
  const currentRoute = route.slice(-1).join('/');
  const activeTab = tabs.findIndex(tab => tab.route === currentRoute);

  const instance = data?.instance?.data as InstanceEntity;

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
        <Button onClick={back} variant="outlined">
          <ArrowBackRoundedIcon sx={{mr: 1}} />
          {t('instance.settings.back')}
        </Button>
      </Grid>
      <Grid item sx={{pl: '0 !important'}} xs={6} sm={8}>
        <Typography
          variant="h2"
          sx={{
            lineHeight: 0.9,
            pl: 7,
            [theme.breakpoints.down('md')]: {pl: '0 !important'},
          }}
        >
          {t('instance.settings.title')}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          mt: 3,
          pl: '0 !important',
        }}
        xs={12}
      >
        <Paper sx={{p: 0}}>
          <Tabs
            value={activeTab}
            onChange={(_e, index) =>
              push(`${baseRoute}/${tabs[index].route}`, undefined, {
                shallow: true,
              })
            }
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {tabs.map(({disabled, titleKey}) => (
              <Tab label={t(titleKey)} disabled={disabled} />
            ))}
          </Tabs>
          <Divider />
          <Component instance={instance} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InstanceSettingsLayout;

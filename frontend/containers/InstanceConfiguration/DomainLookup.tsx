import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {InstanceSettingsPage} from '../../layouts/InstanceSettings';
import {useInstanceCustomDomainLookupQuery} from '../../graphql/hooks';
import useToastStore from '../../stores/useToastStore';
import {useTheme} from '@mui/system';

const DomainLookup: InstanceSettingsPage = ({instance}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const addToast = useToastStore(s => s.addToast);
  const {data, loading, error} = useInstanceCustomDomainLookupQuery({
    variables: {id: instance.id as string},
    pollInterval: 6000,
  });

  if (loading) return <LinearProgress color="secondary" />;
  if (error)
    return (
      <Button
        variant="contained"
        color="error"
        onClick={() => addToast(error.message)}
      >
        {t('lookup.error.button')}
      </Button>
    );

  const customDomainLookup =
    data?.instance?.data?.attributes?.customDomainLookup?.ip;

  const lookupColor =
    customDomainLookup === t('domains.required_ip')
      ? theme.palette.success.main
      : 'error';

  return (
    <Typography color={lookupColor}>
      {customDomainLookup || t('lookup.none')}
    </Typography>
  );
};

export default DomainLookup;

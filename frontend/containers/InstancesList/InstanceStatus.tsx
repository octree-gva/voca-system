import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import {Instance} from '../../graphql/hooks';

const InstanceStatus = ({status, envName}: Instance) => {
  const {t} = useTranslation();
  if (!status)
    return (
      <Typography component="span" variant="overline">
        <br />
      </Typography>
    );
  switch (status) {
    case 'started':
      const url = envName + '.voca.city';
      return (
        <Link
          href={'https://' + url}
          target="_blank"
          rel="noopener"
          sx={{
            textTransform: 'initial',
            textDecoration: 'none',
            color: ({palette: {primary}}) => primary.main,
            fontWeight: 'bold'
          }}
          variant="overline"
        >
          {url}
        </Link>
      );
    case 'stopped':
      return (
        <Typography
          component="span"
          sx={{textTransform: 'initial'}}
          variant="overline"
          color="error"
        >
          {t('instance.stopped')}
        </Typography>
      );

    default:
      return (
        <Typography
          component="span"
          sx={{textTransform: 'initial'}}
          variant="overline"
        >
          {t(`instance.${status}`)}
        </Typography>
      );
  }
};

export default InstanceStatus;

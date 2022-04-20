import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {Trans, useTranslation} from 'react-i18next';
import {
  InstanceEntity,
  useNotificationsQuery,
  Enum_Notification_Level,
} from '../../graphql/hooks';

const InstanceStatus = ({attributes, id}: InstanceEntity) => {
  const {status, envName} = attributes || {};
  const {data: notificationData, loading} = useNotificationsQuery({
    variables: {instance: '' + id},
    pollInterval: 10000,
  });
  const {t} = useTranslation();
  const notifications = notificationData?.notifications?.data || [];

  if (!status || loading || notifications.length === 0)
    return (
      <Typography component="span" variant="overline">
        <br />
      </Typography>
    );
  const [lastNotification] = notifications;
  return (
    <Typography
      component="span"
      sx={{textTransform: 'initial'}}
      variant="overline"
      color={
        lastNotification?.attributes?.level === Enum_Notification_Level.Error
          ? 'error'
          : undefined
      }
    >
      <Trans
        t={t}
        i18nKey={`instance.${lastNotification?.attributes?.saga}.${lastNotification?.attributes?.content.status}`}
        components={{
          env_link: (
            <Link
              href={'https://' + envName + '.voca.city'}
              target="_blank"
              rel="noopener"
              sx={{
                textTransform: 'initial',
                textDecoration: 'none',
                color: ({palette: {info}}) => info.main,
                fontWeight: 'bold',
              }}
              variant="overline"
            />
          ),
        }}
      />
    </Typography>
  );
};

export default InstanceStatus;

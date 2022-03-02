import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import Centered from '../layouts/centered';

const ErrorPage = () => {
  const {t} = useTranslation(undefined, {
    keyPrefix: 'auth.unauthorized',
  });
  return (
    <Centered publicAccess noRedirect>
      <Card elevation={3}>
        <CardHeader title={t`title`} />
        <CardContent>
          <Typography>{t`content`}</Typography>
        </CardContent>
        <Link href="/auth/login" passHref>
          <CardActionArea>
            <Button color="primary">{t`loginAction`}</Button>
          </CardActionArea>
        </Link>
      </Card>
    </Centered>
  );
};

export default ErrorPage;

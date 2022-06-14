import {Typography} from '@mui/material';
import Box from '@mui/system/Box';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import Logo from '../../components/Logo';
import SupportButton from '../../containers/SupportButton';
import Centered from '../../layouts/Centered';

const Errors = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const {errorCode = 'default'} = router.query;

  return (
    <Centered publicAccess noRedirect>
      <Box my={4}>
        <Logo height={60} width={240} />
      </Box>
      <Typography my={4} variant="h2">
        {t(`errors.${errorCode}.title`, {
          defaultValue: t`errors.default.title`,
        })}
      </Typography>
      <Typography variant="h6">
        {t(`errors.${errorCode}.desc`, {defaultValue: t`errors.default.desc`})}
      </Typography>
      <SupportButton offset={0} />
    </Centered>
  );
};

export default Errors;

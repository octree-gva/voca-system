import Fab from '@mui/material/Fab';
import {useTranslation} from 'react-i18next';

const SupportButton = () => {
  const {t} = useTranslation();
  return (
    <Fab
      variant="extended"
      size="medium"
      sx={{position: 'fixed', right: 16, bottom: 16, textTransform: 'initial'}}
      aria-label={t('support')}
      href="mailto:support@octree.ch"
    >
      {t('support')}
    </Fab>
  );
};

export default SupportButton;

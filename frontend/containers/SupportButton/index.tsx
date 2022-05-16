import Fab from '@mui/material/Fab';
import {useTranslation} from 'react-i18next';

interface Props {
  offset?: number;
}

const SupportButton = ({offset = 0}: Props) => {
  const {t} = useTranslation();
  return (
    <Fab
      variant="extended"
      size="medium"
      sx={{
        position: 'fixed',
        right: theme => theme.spacing(2),
        bottom: theme => theme.spacing(2 + offset),
        textTransform: 'initial',
        zIndex: theme => theme.zIndex.modal + 1,
      }}
      aria-label={t('support')}
      href="mailto:support@octree.ch"
    >
      {t('support')}
    </Fab>
  );
};

export default SupportButton;

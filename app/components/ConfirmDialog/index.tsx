import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

const TEXT_VERIF = 'SUPPRESSION';

interface Props {
  open: boolean;
  toggle: () => void;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
  withTextInput?: boolean;
}

const ConfirmDialog = (props: Props) => {
  const {open, toggle, content, onCancel, withTextInput} = props;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [textVerif, setTextVerif] = useState('');
  const canConfirm = !withTextInput || textVerif === TEXT_VERIF;

  const onConfirm = async () => {
    setLoading(true);
    await props.onConfirm();
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={toggle} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {withTextInput && (
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              {t(`generic.textVerif`)} : {TEXT_VERIF}
            </Typography>
            <TextField
              value={textVerif}
              onChange={e => setTextVerif(e.target.value)}
              fullWidth
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onCancel}
          color="inherit"
        >{t`generic.cancel`}</Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          color="secondary"
          disabled={loading || !canConfirm}
        >
          {loading ? t`generic.loading` : t`generic.confirm`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

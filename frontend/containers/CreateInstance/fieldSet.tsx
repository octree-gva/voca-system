import {styled} from '@mui/system';

const FieldSet = styled('fieldset')(({theme}) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  margin: theme.spacing(1, 0),
  border: 'none',
}));

export default FieldSet;

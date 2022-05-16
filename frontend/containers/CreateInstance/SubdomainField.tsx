import {InputAdornment} from '@mui/material';
import {TextFieldProps, TextField} from 'formik-mui';
import {styled} from '@mui/material/styles';

const SubdomainField: React.FC<TextFieldProps> = props => {
  return (
    <StyledSubdomainField
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">.voca.city</InputAdornment>
        ),
      }}
    />
  );
};

const StyledSubdomainField = styled(TextField)(({theme}) => ({
  backgroundColor: theme.palette.divider,
  '& input, & > p': {background: theme.palette.background.default},
  '& > p': {margin: 0, padding: theme.spacing(1, 2, 0, 2)},
}));

export default SubdomainField;

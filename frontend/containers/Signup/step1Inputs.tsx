import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {StepInputs} from '../StepsForm';

const SignupStep1Inputs: StepInputs = () => {
  const {t} = useTranslation(undefined);

  return (
    <FieldSet>
      <Typography
        variant="h5"
        color="textSecondary"
      >{t`register.account.heading`}</Typography>
      <Typography
        variant="h6"
        pb={1.5}
        color="textSecondary"
      >{t`register.account.desc`}</Typography>
      <Field
        component={TextField}
        name="email"
        type="email"
        label={t`register.account.email`}
        required
      />
    </FieldSet>
  );
};

const FieldSet = styled('fieldset')(({theme}) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  margin: theme.spacing(1, 0),
  border: 'none',
}));

export default SignupStep1Inputs;

import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {StepInputs} from '../StepsForm';

const SignupStep2Inputs: StepInputs = () => {
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
        name="password"
        type="password"
        label={t`register.account.password`}
        required
      />
      <Field
        component={TextField}
        name="password_confirmation"
        type="password"
        label={t`register.account.password_confirmation`}
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

export default SignupStep2Inputs;

import {useState} from 'react';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import useValidationSchema from './useValidationSchema';
import {signIn} from 'next-auth/react';
import {Box, Button, Dialog} from '@mui/material';
import {useRegisterUserMutation} from '../../graphql/hooks';

const INITIAL_VALUES = {
  email: '',
  password: '',
  password_confirmation: '',
};

export type SignupProps = React.PropsWithChildren<{}>;

const Signup = ({children}: SignupProps) => {
  const {t} = useTranslation(undefined);
  const [errCode, setErrCode] = useState<null | string>();
  const RegisterSchema = useValidationSchema();
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    setErrCode(null);
    try {
      const {email, password, password_confirmation} = values;
      if (password_confirmation !== password) {
        setErrCode('password_confirmation');
        return;
      }
      const {
        data: {register: {user: {administratorAccounts}}={}},
      } = await registerUser({variables: {email, password}});
      const accountId = administratorAccounts[0].id;

      // Sign in
      await signIn('credentials', {
        identifier: email,
        password,
        callbackUrl: `/${accountId}/onboard`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open
      onClose={() => null}
      aria-labelledby="create-instance"
      maxWidth="md"
      PaperProps={{sx: {zIndex: 99}}}
      transitionDuration={1}
      disablePortal
    >
      <Box width={440} maxWidth="100%" p={3}>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <FieldSet>
                <Typography
                  variant="h6"
                  color="textSecondary"
                >{t`register.account.heading`}</Typography>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label={t`register.account.email`}
                  required
                />
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
              {errCode && (
                <Typography color="error" sx={{mb: 2}}>
                  {t(`errors.${errCode}`)}
                </Typography>
              )}
              {children}
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
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

export default Signup;

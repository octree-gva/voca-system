import {Typography, Button, FormHelperText} from '@mui/material';
import {signIn, useSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import Layout from '../layouts/auth';
import {styled} from '@mui/material/styles';
import {useCallback, useMemo} from 'react';
import LogoutButton from '../components/LogoutButton';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import * as Yup from 'yup';
import {useRouter} from 'next/router';

const AuthForm = styled(Form)(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
const AlreadyLoggedIn = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export type SignInPayload = {
  identifier: string;
  password: string;
  callbackUrl: string;
};

const LoginForm = () => {
  const {t} = useTranslation(undefined, {keyPrefix: 'auth'});
  const {query = {}} = useRouter();
  const session = useSession();

  const LoginSchema = useMemo(
    () =>
      Yup.object().shape({
        identifier: Yup.string()
          .email(t`errors.email.format`)
          .required(t`errors.email.required`),
        password: Yup.string()
          .min(3, t`errors.email.min_length`)
          .required(t`errors.password.required`),
      }),
    [t]
  );
  const handleSubmit = useCallback(
    (values: SignInPayload) => {
      signIn('credentials', values);
    },
    [signIn]
  );
  const hasServerError = useMemo(() => !!query?.error, [query]);
  const initialValues = useMemo<SignInPayload>(
    () => ({
      identifier: '',
      password: '',
      callbackUrl: '',
    }),
    []
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {props => (
        <AuthForm>
          <Typography
            variant="overline"
            color="textSecondary"
            align="center"
          >{t`login.title`}</Typography>
          {hasServerError && (
            <FormHelperText error>
              <Typography align="center">{t`errors.generic`}</Typography>
            </FormHelperText>
          )}
          <Field
            component={TextField}
            variant="outlined"
            label={t`login.email`}
            type="email"
            name="identifier"
            autoFocus
          />
          <Field
            component={TextField}
            variant="outlined"
            label={t`login.password`}
            type="password"
            name="password"
          />
          <Button
            disabled={props.isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            {t`login.confirm`}
          </Button>
        </AuthForm>
      )}
    </Formik>
  );
};
export default LoginForm;

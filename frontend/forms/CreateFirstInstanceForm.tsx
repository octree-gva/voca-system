import React, {useMemo} from 'react';
import {Formik, Form, Field} from 'formik';
import {TextField, TextFieldProps} from 'formik-mui';
import {useTranslation} from 'react-i18next';
import {InputAdornment, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import * as Yup from 'yup';
import axios from 'axios';

export type FirstInstancePayload = {
  email: string;
  password: string;
  password_confirmation: string;

  title: string;
  acronym: string;
  subdomain: string;
};
const FieldSet = styled('fieldset')(({theme}) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  margin: theme.spacing(1, 0),
  border: 'none',
}));
const StyledSubdomainField = styled(TextField)(({theme}) => ({
  backgroundColor: theme.palette.divider,
  '& input, & > p': {background: theme.palette.background.default},
  '& > p': {margin: 0, padding: theme.spacing(1, 2, 0, 2)},
}));
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
export type CreateFirstInstanceFormProps = React.PropsWithChildren<{}>;
const CreateFirstInstanceForm = ({children}: CreateFirstInstanceFormProps) => {
  const {t} = useTranslation(undefined, {keyPrefix: 'register'});
  const {t: et} = useTranslation(undefined, {keyPrefix: 'auth'});
  const RegisterSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(et`errors.email.format`)
          .required(et`errors.email.required`),
        password: Yup.string()
          .min(10, et`errors.email.min_length`)
          .required(et`errors.password.required`)
          .matches(
            new RegExp(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
            ),
            et`errors.password.complex`
          ),
        password_confirmation: Yup.string()
          .required(et`errors.password_confirmation.required`)
          .oneOf([Yup.ref('password')], et`errors.password_confirmation.match`),
        title: Yup.string()
          .required(t`errors.decidim.title.required`)
          .max(200, t`errors.decidim.title.max_length`)
          .min(3, t`errors.decidim.title.min_length`),
        subdomain: Yup.string()
          .required(t`errors.decidim.subdomain.required`)
          .min(3, t`errors.decidim.subdomain.min_length`)
          .matches(
            /^[a-z0-9\-\.\_]+[a-z0-9]+$/,
            t`errors.decidim.subdomain.format`
          )
          .test(
            'punycode',
            t`errors.decidim.subdomain.punycode`,
            value => !`${value}`.startsWith('xn--')
          )
          .test(
            'uniq-subdomain',
            'Subdomain ${value} is already taken.',
            async value => {
              return !value || !!(await axios.get(`/api/rest/first-install/${value}`))
                .data?.ok;
            }
          ),
      }),
    [t]
  );

  const initialValues = useMemo<FirstInstancePayload>(
    () => ({
      email: '',
      password: '',
      password_confirmation: '',
      title: '',
      acronym: '',
      subdomain: '',
    }),
    []
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={async values => {
        await axios.post('/api/rest/first-install', {...values});
      }}
    >
      {() => (
        <Form>
          <FieldSet>
            <Typography
              variant="h6"
              color="textSecondary"
            >{t`account.heading`}</Typography>
            <Field
              component={TextField}
              name="email"
              type="email"
              label={t`account.email`}
              required
            />
            <Field
              component={TextField}
              name="password"
              type="password"
              label={t`account.password`}
              required
            />
            <Field
              component={TextField}
              name="password_confirmation"
              type="password"
              label={t`account.password_confirmation`}
              required
            />
          </FieldSet>
          <FieldSet>
            <Typography
              variant="h6"
              color="textSecondary"
            >{t`decidim.heading`}</Typography>
            <Field
              component={TextField}
              name="title"
              label={t`decidim.title`}
              required
            />
            <Field
              component={TextField}
              name="acronym"
              label={t`decidim.acronym`}
            />
            <Field
              component={SubdomainField}
              name="subdomain"
              label={t`decidim.subdomain`}
              required
            />
          </FieldSet>
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default CreateFirstInstanceForm;

import {useState} from 'react';
import MuiTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import {Formik, Form, Field} from 'formik';
import {Autocomplete, TextField} from 'formik-mui';
import SubdomainField from './SubdomainField';
import useValidationSchema from './useValidationSchema';
import {useFirstInstallMutation} from '../../graphql/hooks';
import {signIn} from 'next-auth/react';

type Option = {
  id: string;
  label: string;
};

type TranslatedOption = {
  value: string;
  label: string;
};

const INITIAL_VALUES = {
  email: '',
  password: '',
  password_confirmation: '',
  title: '',
  acronym: '',
  subdomain: '',
  timezone: {label: 'UTC', id: 'Etc/UTC'} as Option,
  currency: '€',
  default_locale: {label: 'French', id: 'fr'} as Option,
  available_locales: [] as Array<Option>,
};

export type CreateFirstInstanceFormProps = React.PropsWithChildren<{}>;

const CreateFirstInstanceForm = ({children}: CreateFirstInstanceFormProps) => {
  const {t} = useTranslation(undefined);
  const router = useRouter();
  const [errCode, setErrCode] = useState<null | string>();
  const RegisterSchema = useValidationSchema();
  const [createFirstInstall] = useFirstInstallMutation();

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    setErrCode(null);
    try {
      const {
        email,
        password,
        password_confirmation,
        title,
        acronym,
        subdomain,
        currency,
        available_locales,
        default_locale,
        timezone,
      } = values;
      const user = {email, password, password_confirmation};
      const instance = {
        title,
        acronym,
        subdomain,
        currency,
        available_locales: available_locales.map(({id}) => id).join(','),
        default_locale: default_locale.id,
        timezone: timezone.id,
      };
      try {
        await createFirstInstall({
          variables: {user, instance},
        });
      } catch (err) {
        // pass
        console.log(err);
      }
      // Sign in
      await signIn('credentials', {
        identifier: email,
        password,
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const valueToId = ({label, value}: TranslatedOption): Option => ({
    label,
    id: value,
  });

  const timezoneOptions = (
    t('available_timezones', {
      returnObjects: true,
    }) as Array<TranslatedOption>
  ).map(valueToId);

  const localeOptions = (
    t('available_locales', {
      returnObjects: true,
    }) as Array<TranslatedOption>
  ).map(valueToId);

  return (
    <Formik
      initialValues={{
        ...INITIAL_VALUES,
        timezone:
          timezoneOptions.find(({id}) => id === INITIAL_VALUES.timezone.id) ||
          INITIAL_VALUES.timezone,
        default_locale:
          localeOptions.find(
            ({id}) => id === INITIAL_VALUES.default_locale.id
          ) || INITIAL_VALUES.default_locale,
      }}
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
          <FieldSet>
            <Typography
              variant="h6"
              color="textSecondary"
            >{t`register.decidim.heading`}</Typography>
            <Field
              component={TextField}
              name="title"
              label={t`register.decidim.title`}
              required
            />
            <Field
              component={TextField}
              name="acronym"
              label={t`register.decidim.acronym`}
            />
            <Field
              component={TextField}
              name="currency"
              label={t`register.decidim.currency`}
              required
            />
            <Field
              component={Autocomplete}
              renderInput={({...params}) => (
                <MuiTextField
                  {...params}
                  label={t`register.decidim.timezone`}
                />
              )}
              options={timezoneOptions}
              name="timezone"
              required
            />
            <Field
              component={Autocomplete}
              renderInput={({...params}) => (
                <MuiTextField
                  {...params}
                  label={t`register.decidim.default_locale`}
                />
              )}
              name="default_locale"
              options={localeOptions}
              required
            />
            <Field
              component={Autocomplete}
              name="available_locales"
              renderInput={({...params}) => (
                <MuiTextField
                  {...params}
                  label={t`register.decidim.available_locales`}
                />
              )}
              multiple
              options={localeOptions}
              required
            />
            <Field
              component={SubdomainField}
              name="subdomain"
              label={t`register.decidim.subdomain`}
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

export default CreateFirstInstanceForm;

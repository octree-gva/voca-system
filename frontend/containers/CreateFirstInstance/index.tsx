import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import {Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import SubdomainField from './SubdomainField';
import useValidationSchema from './useValidationSchema';
import {useFirstInstallMutation} from '../../graphql/hooks';

const INITIAL_VALUES = {
  email: '',
  password: '',
  password_confirmation: '',
  title: '',
  acronym: '',
  subdomain: '',
};

export type CreateFirstInstanceFormProps = React.PropsWithChildren<{}>;

const CreateFirstInstanceForm = ({children}: CreateFirstInstanceFormProps) => {
  const {t} = useTranslation(undefined, {keyPrefix: 'register'});
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
      } = values;
      const user = {email, password, password_confirmation};
      const instance = {title, acronym, subdomain};
      const {data: firstInstallData} = await createFirstInstall({
        variables: {user, instance},
      });
      const response = firstInstallData?.firstInstall || {
        ok: false,
        errCode: 'SERVER_ERROR',
      };
      if (response.ok) router.push('/auth/login');
      else setErrCode(response.errCode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

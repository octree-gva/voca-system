import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import MuiTextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {Field, Form, Formik} from 'formik';
import {Autocomplete, TextField} from 'formik-mui';
import Logo from '../../components/Logo';
import useValidationSchema from './useValidationSchema';
import {InstancesDocument, useCreateInstanceMutation} from '../../graphql/hooks';
import SubdomainField from './SubdomainField';
import {styled} from '@mui/system';
import Button from '@mui/material/Button';
import {useSession} from 'next-auth/react';

interface Props {
  open: boolean;
  onClose: () => void;
  submitCallback?: () => void;
}

type Option = {
  id: string;
  label: string;
};

type TranslatedOption = {
  value: string;
  label: string;
};

const INITIAL_VALUES = {
  title: '',
  acronym: '',
  subdomain: '',
  timezone: {label: 'UTC', id: 'Etc/UTC'} as Option,
  currency: '€',
  default_locale: {label: 'French', id: 'fr'} as Option,
  available_locales: [] as Array<Option>,
};

const CreateInstance = (props: Props) => {
  const [errCode, setErrCode] = useState<null | string>();
  const [createInstance] = useCreateInstanceMutation();
  const RegisterSchema = useValidationSchema();
  const {data: {user} = {}} = useSession();
  const {t} = useTranslation();
  const {open, onClose, submitCallback = props.onClose} = props;
  const account = user.administratorAccounts[0];

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    setErrCode(null);
    try {
      const {available_locales, default_locale, timezone} = values;
      await createInstance({
        variables: {
          data: {
            ...values,
            available_locales: [default_locale, ...available_locales].map(({id}) => id).join(','),
            default_locale: default_locale.id,
            timezone: timezone.id,
            creator: user.id,
            account: account.id,
          },
        },
        refetchQueries: [
          {
            query: InstancesDocument,
          },
        ],
      });
      submitCallback();
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
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-instance"
      maxWidth="md"
      PaperProps={{sx: {zIndex: 99}}}
      transitionDuration={1}
    >
      <Box width={440} maxWidth="100%" p={3}>
        <Box textAlign="center" py={3}>
          <Logo height={30} width={120} />
        </Box>
        <Box py={4}>
          <Typography variant="h3" id="create-instance">
            {t('CreateInstance.title')}
          </Typography>
          <Formik
            initialValues={{
              ...INITIAL_VALUES,
              timezone:
                timezoneOptions.find(
                  ({id}) => id === INITIAL_VALUES.timezone.id
                ) || INITIAL_VALUES.timezone,
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
                  <Field
                    component={TextField}
                    name="title"
                    label={t`CreateInstance.platform_title`}
                    required
                  />
                  <Field
                    component={TextField}
                    name="acronym"
                    label={t`CreateInstance.acronym`}
                  />
                  <Field
                    component={TextField}
                    name="currency"
                    label={t`CreateInstance.currency`}
                    required
                  />
                  <Field
                    component={Autocomplete}
                    renderInput={({...params}) => (
                      <MuiTextField
                        {...params}
                        label={t`CreateInstance.timezone`}
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
                        label={t`CreateInstance.default_locale`}
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
                        label={t`CreateInstance.available_locales`}
                      />
                    )}
                    multiple
                    options={localeOptions}
                    required
                  />
                  <Field
                    component={SubdomainField}
                    name="subdomain"
                    label={t`CreateInstance.subdomain`}
                    required
                  />
                </FieldSet>
                {errCode && (
                  <Typography color="error" sx={{mb: 2}}>
                    {t(`errors.${errCode}`)}
                  </Typography>
                )}
                <Button type="submit">Register</Button>
              </Form>
            )}
          </Formik>
        </Box>
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

export default CreateInstance;

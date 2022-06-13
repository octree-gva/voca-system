import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import useValidationSchema from './useValidationSchema';
import {
  InstancesDocument,
  useCreateInstanceMutation,
} from '../../graphql/hooks';
import {useSession} from 'next-auth/react';
import StepsForm from '../StepsForm';
import Step1Input from './step1Inputs';
import Step2Input from './step2Inputs';
import MakeStep3Input from './step3Inputs';
import MakeStep4Input from './step4Inputs';
import MakeStep5Input from './step5Inputs';
import {Option} from './types';
import SubmitAction from './SubmitAction';

type TranslatedOption = {
  value: string;
  label: string;
};
const valueToId = ({label, value}: TranslatedOption): Option => ({
  label,
  id: value,
});

interface Props {
  open: boolean;
  onClose: () => void;
  submitCallback?: () => void;
}

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

  const steps = {
    1: {
      Inputs: Step1Input,
    },
    2: {
      Inputs: Step2Input,
    },
    3: {
      Inputs: MakeStep3Input({
        localeOptions,
      }),
    },
    4: {
      Inputs: MakeStep4Input({
        localeOptions,
      }),
    },
    5: {
      Inputs: MakeStep5Input({
        timezoneOptions,
      }),
      Action: SubmitAction,
    },
  }

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    setErrCode(null);
    try {
      const {available_locales, default_locale, timezone} = values;
      await createInstance({
        variables: {
          data: {
            ...values,
            available_locales: [default_locale, ...available_locales]
              .map(({id}) => id)
              .join(','),
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
          {({...formik}) => (
            <StepsForm
              steps={steps}
              {...formik}
            />
          )}
        </Formik>
        {errCode && (
          <Typography color="error" sx={{mb: 2}}>
            {t(`errors.${errCode}`)}
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default CreateInstance;

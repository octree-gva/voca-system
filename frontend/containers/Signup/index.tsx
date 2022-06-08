import {useState} from 'react';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {signIn} from 'next-auth/react';
import {Box, Dialog, Typography} from '@mui/material';
import useValidationSchema from './useValidationSchema';
import SignupStep1Inputs from './step1Inputs';
import Step2Inputs from './step2Inputs';
import StepsForm from '../StepsForm';
import {useRegisterUserMutation} from '../../graphql/hooks';
import SubmitAction from './SubmitAction';

const INITIAL_VALUES = {
  email: '',
  password: '',
  password_confirmation: '',
};

const Signup = () => {
  const {t} = useTranslation();
  const [errCode, setErrCode] = useState<null | string>();
  const RegisterSchema = useValidationSchema();
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    console.log(values);
    setErrCode(null);
    try {
      const {email, password, password_confirmation} = values;
      if (password_confirmation !== password) {
        setErrCode('password_confirmation');
        return;
      }
      const {
        data: {register: {user: {administratorAccounts}} = {}},
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
          {({...formik}) => (
            <StepsForm
              steps={{
                1: {Inputs: SignupStep1Inputs},
                2: {Inputs: Step2Inputs, Action: SubmitAction},
              }}
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

export default Signup;

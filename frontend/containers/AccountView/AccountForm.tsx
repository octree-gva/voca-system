import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {
  useProfileQuery,
  UsersPermissionsUserInput,
  useUpdateUserMutation,
} from '../../graphql/hooks';
import {TextField} from 'formik-mui';
import useToastStore from '../../stores/useToastStore';

interface Props {
  setEditing: (bool: boolean) => void;
}

const UserFields = ({setEditing}: Props) => {
  const {t} = useTranslation();
  const {data} = useProfileQuery();
  const [updateUser] = useUpdateUserMutation();
  const addToast = useToastStore(s => s.addToast);

  const onSubmit = async (userUpdate: UsersPermissionsUserInput) => {
    if (data?.me?.id) {
      await updateUser({variables: {userUpdate, id: data?.me?.id}});
      addToast(t('account.updated'));
      setEditing(false);
    } else {
      addToast(t('account.errors.submit'));
    }
  };

  const initialValues = {
    firstName: data?.me?.firstName || '',
    lastName: data?.me?.lastName || '',
    email: data?.me?.email || '',
  };

  const AccountSchema = () =>
    Yup.object().shape({
      firstName: Yup.string()
        .min(2, t`account.errors.firstname.min_length`)
        .required(t`account.errors.firstname.required`),
      lastName: Yup.string()
        .min(2, t`account.errors.lastname.min_length`)
        .required(t`account.errors.lastname.required`),
      email: Yup.string()
        .min(10, t`account.errors.email.min_length`)
        .required(t`account.errors.email.required`),
    });

  return (
    <Box sx={{justifyContent: 'space-between', p: 1.5}}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={AccountSchema}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <Box sx={{width: '50%', display: 'inline-block'}}>
              <Box sx={{p: 1.5}}>
                <Field
                  component={TextField}
                  variant="outlined"
                  label={t`account.firstname`}
                  name="firstName"
                  autoFocus
                  fullWidth
                />
              </Box>
              <Box sx={{p: 1.5}}>
                <Field
                  component={TextField}
                  variant="outlined"
                  label={t`account.lastname`}
                  name="lastName"
                  fullWidth
                />
              </Box>
              <Box sx={{p: 1.5}}>
                <Field
                  component={TextField}
                  variant="outlined"
                  label={t`account.email`}
                  name="email"
                  type="email"
                  fullWidth
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: '50%',
                display: 'inline-block',
                textAlign: 'right',
                verticalAlign: 'top',
                p: 1.5,
              }}
            >
              <Button
                disabled={props.isSubmitting}
                color="info"
                type="submit"
              >
                {t('account.save')}
              </Button>
              <Button
                disabled={props.isSubmitting}
                size="small"
                onClick={e => {
                  setEditing(false);
                  props.handleReset(e);
                }}
              >
                {t('account.cancel')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserFields;

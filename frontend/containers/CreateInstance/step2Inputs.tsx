import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import SubdomainField from './SubdomainField';
import {StepInputs} from '../StepsForm';
import FieldSet from './fieldSet';
import Typography from '@mui/material/Typography';

const CreateInstanceStep2Inputs: StepInputs = () => {
  const {t} = useTranslation();

  return (
    <FieldSet>
      <Typography
        variant="h5"
        color="textSecondary"
      >{t`CreateInstance.heading`}</Typography>
      <Typography
        variant="h6"
        pb={1.5}
        color="textSecondary"
      >{t`CreateInstance.about`}</Typography>
      <Field
        component={SubdomainField}
        name="subdomain"
        label={t`CreateInstance.subdomain`}
        required
      />
    </FieldSet>
  );
};

export default CreateInstanceStep2Inputs;

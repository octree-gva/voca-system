import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {StepInputs} from '../StepsForm';
import FieldSet from './fieldSet';
import Typography from '@mui/material/Typography';

const CreateInstanceStep1Input: StepInputs = () => {
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
    </FieldSet>
  );
};

export default CreateInstanceStep1Input;

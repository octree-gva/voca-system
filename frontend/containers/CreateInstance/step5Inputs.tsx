import MuiTextField from '@mui/material/TextField';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {Autocomplete, TextField} from 'formik-mui';
import {StepInputs} from '../StepsForm';
import FieldSet from './fieldSet';
import {Option} from './types';
import Typography from '@mui/material/Typography';

interface MakeStepArgs {
  timezoneOptions: Array<Option>;
}

const MakeStep5Input =
  ({timezoneOptions}: MakeStepArgs): StepInputs =>
  () => {
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
        >{t`CreateInstance.options`}</Typography>
        <Field
          component={TextField}
          name="currency"
          label={t`CreateInstance.currency`}
          required
        />
        <Field
          component={Autocomplete}
          renderInput={({...params}) => (
            <MuiTextField {...params} label={t`CreateInstance.timezone`} />
          )}
          options={timezoneOptions}
          name="timezone"
          required
        />
      </FieldSet>
    );
  };

export default MakeStep5Input;

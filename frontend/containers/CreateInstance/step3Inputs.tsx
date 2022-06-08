import MuiTextField from '@mui/material/TextField';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {Autocomplete} from 'formik-mui';
import {StepInputs} from '../StepsForm';
import FieldSet from './fieldSet';
import {Option} from './types';
import Typography from '@mui/material/Typography';

interface MakeStepArgs {
  localeOptions: Array<Option>;
}

const MakeStep3Input =
  ({localeOptions}: MakeStepArgs): StepInputs =>
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
      </FieldSet>
    );
  };

export default MakeStep3Input;

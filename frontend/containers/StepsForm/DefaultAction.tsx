import Button from '@mui/material/Button';
import {FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import {StepHelpers} from '../../hooks/useSteps';

export type StepAction = <T extends Record<string, unknown>>(
  props: StepHelpers & FormikProps<T>
) => JSX.Element;

const DefaultAction: StepAction = ({canGoToNextStep, goToNextStep, errors}) => {
  const {t} = useTranslation();
  const disabled = !canGoToNextStep && Object.keys(errors).length === 0;
  return (
    <Button disabled={disabled} fullWidth onClick={goToNextStep}>
      {t('stepsForm.next')}
    </Button>
  );
};

export default DefaultAction;

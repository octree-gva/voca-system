import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Form, FormikProps} from 'formik';
import useSteps, {StepHelpers} from '../../hooks/useSteps';
import DefaultAction, {StepAction} from './DefaultAction';
import Logo from '../../components/Logo';
import Box from '@mui/system/Box';

export type StepInputs = (helpers: StepHelpers) => JSX.Element;

export interface StepConfig {
  Inputs: StepInputs;
  Action?: StepAction;
}

const StepsForm = <T extends Record<string, unknown>>({
  steps,
  ...formik
}: FormikProps<T> & {steps: Record<number, StepConfig>}) => {
  const [currentStep, stepHelpers] = useSteps(Object.keys(steps).length);
  const {Inputs, Action = DefaultAction} = steps[currentStep];
  return (
    <Form>
      <Box width={440} maxWidth="100%" p={3}>
        <Box textAlign="center" py={3}>
          {stepHelpers.canGoToPrevStep && (
            <Button
              sx={{
                top: 16,
                left: 16,
                position: 'absolute',
                border: 0,
                minWidth: 0,
              }}
              onClick={stepHelpers.goToPrevStep}
            >
              <ArrowBackIcon />
            </Button>
          )}
          <Logo height={30} width={120} />
        </Box>
        <Box py={1.5}>
          <Inputs {...stepHelpers} />
        </Box>
        <Box py={1.5}>
          <Action<T> {...stepHelpers} {...formik} />
        </Box>
      </Box>
    </Form>
  );
};

export default StepsForm;

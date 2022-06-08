import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {StepAction} from '../StepsForm/DefaultAction';

const SubmitAction: StepAction = ({isValid, handleSubmit}) => {
  const {t} = useTranslation();
  return (
    <Button disabled={!isValid} fullWidth onClick={() => handleSubmit()}>
      {t('CreateInstance.submit')}
    </Button>
  );
};

export default SubmitAction;

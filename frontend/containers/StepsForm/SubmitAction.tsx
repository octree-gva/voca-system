import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {StepAction} from './DefaultAction';

const SubmitAction: StepAction = ({isValid, handleSubmit}) => {
  const {t} = useTranslation();
  return (
    <Button disabled={!isValid} fullWidth onClick={() => handleSubmit()}>
      {t('signup.next')}
    </Button>
  );
};

export default SubmitAction;

import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {StepAction} from '../StepsForm/DefaultAction';

const SubmitAction: StepAction = ({isValid}) => {
  const {t} = useTranslation();
  return (
    <Button disabled={!isValid} fullWidth type="submit">
      {t('CreateInstance.submit')}
    </Button>
  );
};

export default SubmitAction;

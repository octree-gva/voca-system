import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

const useValidationSchema = () => {
  const {t} = useTranslation(undefined, {keyPrefix: 'register'});
  const {t: et} = useTranslation(undefined, {keyPrefix: 'auth'});

  return useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(et`errors.email.format`)
          .required(et`errors.email.required`),
        password: Yup.string()
          .min(10, et`errors.password.min_length`)
          .required(et`errors.password.required`)
          .matches(
            new RegExp(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})'
            ),
            et`errors.password.complex`
          ),
        password_confirmation: Yup.string()
          .required(et`errors.password_confirmation.required`)
          .oneOf([Yup.ref('password')], et`errors.password_confirmation.match`),
      }),
    [t, et]
  );
};

export default useValidationSchema;

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
          .min(10, et`errors.email.min_length`)
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
        title: Yup.string()
          .required(t`errors.decidim.title.required`)
          .max(200, t`errors.decidim.title.max_length`)
          .min(3, t`errors.decidim.title.min_length`),
        subdomain: Yup.string()
          .required(t`errors.decidim.subdomain.required`)
          .min(3, t`errors.decidim.subdomain.min_length`)
          .matches(
            /^[a-z0-9\-\.\_]+[a-z0-9]+$/,
            t`errors.decidim.subdomain.format`
          )
          .test(
            'punycode',
            t`errors.decidim.subdomain.punycode`,
            value => !`${value}`.startsWith('xn--')
          ),
        //   .test(
        //     'uniq-subdomain',
        //     'Subdomain ${value} is already taken.',
        //     async value => {
        //       return (
        //         !value ||
        //         !!(await axios.get(`/api/rest/first-install/${value}`)).data?.ok
        //       );
        //     }
        //   ),
      }),
    [t, et]
  );
};

export default useValidationSchema;

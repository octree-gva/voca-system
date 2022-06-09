import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

const STRAPI_URL = process.env.STRAPI_URL;

const useValidationSchema = () => {
  const {t} = useTranslation(undefined, {keyPrefix: 'register'});

  return useMemo(
    () =>
      Yup.object().shape({
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
          )
          .test(
            'checkDuplicate',
            t('errors.decidim.subdomain.duplicate'),
            function (value) {
              return new Promise((resolve, reject) => {
                fetch(`${STRAPI_URL}/api/decidim/subdomain`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({subdomain: value}),
                })
                  .then(async response => {
                    const body = await response.json();
                    const result = JSON.parse(body);
                    resolve(result.ok);
                  })
                  .catch(() => {
                    resolve(true);
                  });
              });
            }
          ),
      }),
    [t]
  );
};

export default useValidationSchema;

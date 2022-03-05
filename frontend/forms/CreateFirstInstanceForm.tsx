import React, {useMemo} from 'react';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';

export type FirstInstancePayload = {
  email: string;
  timezone: string;
  firstName: string;
  lastName: string;
  country: string;

  instanceShortName: string;
  instanceName: string;

  languages: string[];
  defaultIndex: number;
};
const CreateFirstInstanceForm = () => {
  const initialValues = useMemo<FirstInstancePayload>(
    () => ({
      email: '',
      timezone: 'Europe/Londres',
      firstName: '',
      lastName: '',
      country: 'CH',
      instanceShortName: '',
      instanceName: '',
      languages: ['en-US'],
      defaultIndex: 0,
    }),
    []
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log({values})}
    >
      <Form>
        <Field component={TextField} name="email" type="email" label="Email" />
      </Form>
    </Formik>
  );
};

export default CreateFirstInstanceForm;

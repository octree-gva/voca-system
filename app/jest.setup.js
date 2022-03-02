import '@testing-library/jest-dom/extend-expect';
import {toMatchDiffSnapshot} from 'snapshot-diff';
import {cleanup} from '@testing-library/react';

expect.extend({toMatchDiffSnapshot});
afterEach(() => {
  cleanup();
});
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: str => `${str}`,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  withTranslation: () => Component => {
    Component.defaultProps = {...Component.defaultProps, t: str => `${str}`};
    return Component;
  },
}));

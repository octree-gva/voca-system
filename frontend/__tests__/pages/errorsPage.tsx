import {render, screen} from 'test-utils';
import Errors from '../../pages/errors';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/errors',
      pathname: '',
      query: {status: '404'},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('Errors page renders', () => {
  let fragment: DocumentFragment | null;

  describe('status=404', () => {
    beforeEach(() => {
      const {asFragment} = render(<Errors />);
      fragment = asFragment();
    });
    it('matches snapshot', () => {
      expect(fragment).toMatchSnapshot();
    });
    it('show i18n 404.title key', () => {
      const errorTitle = screen.getByText(/errors.404.title/i);
      expect(errorTitle).toBeDefined();
    });
    it('show i18n 404.desc key', () => {
      const errorDesc = screen.getByText(/errors.404.desc/i);
      expect(errorDesc).toBeDefined();
    });
  });
});

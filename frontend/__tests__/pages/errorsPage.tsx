import {render, screen} from 'test-utils';
import NextRouter from 'next/router';
import Errors from '../../pages/errors';

describe('Errors page renders', () => {
  let fragment: DocumentFragment | null;

  describe('status=404', () => {
    beforeEach(() => {
      jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
        route: '/errors/404',
        query: {errorCode: '404'},
      } as any);
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

  describe('status=502', () => {
    beforeEach(() => {
      jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
        route: '/errors/502',
        query: {errorCode: '502'},
      } as any);
      const {asFragment} = render(<Errors />);
      fragment = asFragment();
    });
    it('matches snapshot', () => {
      expect(fragment).toMatchSnapshot();
    });
    it('show i18n 502.title key', () => {
      const errorTitle = screen.getByText(/errors.502.title/i);
      expect(errorTitle).toBeDefined();
    });
    it('show i18n 502.desc key', () => {
      const errorDesc = screen.getByText(/errors.502.desc/i);
      expect(errorDesc).toBeDefined();
    });
  });
});

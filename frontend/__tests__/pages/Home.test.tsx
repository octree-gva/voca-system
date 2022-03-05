import {Typography} from '@mui/material';
import {render} from 'test-utils';
import Home from '../../pages/home';
jest.mock(
  '../../forms/CreateFirstInstanceForm',
  () => () => '<CreateFirstInstanceForm />'
);
describe('Home page as disconnected', () => {
  test('screenshots match', () => {
    const {asFragment} = render(<Home />, {isPublic: true});
    expect(asFragment()).toMatchSnapshot();
  });
});

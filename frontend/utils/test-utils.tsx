import React, {ReactElement, FC} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../theme';
import {Session} from 'next-auth';
import {SessionProvider} from 'next-auth/react';
import {render, RenderOptions} from '@testing-library/react';

export type TestWrapperProps = React.PropsWithChildren<{
  session: Session | null;
}>;
const TestWrapper: FC<TestWrapperProps> = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SessionProvider>
  );
};
const UnAuthenticatedWrapper: FC = props => (
  <TestWrapper {...props} session={null} />
);
const AuthenticatedWrapper: FC = props => (
  <TestWrapper
    {...props}
    session={{user: {username: 'john-doe'}, expires: `${+new Date() + 30000}`}}
  />
);

const customRender = (
  ui: ReactElement,
  options?: {isPublic?: boolean} & Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: !!options?.isPublic
      ? UnAuthenticatedWrapper
      : AuthenticatedWrapper,
    ...options,
  });

export * from '@testing-library/react';
// Override our render with the snapshot-friendly render.
export {customRender as render};

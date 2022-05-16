import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Layout, {DefaultProps} from './Common';

export type CenteredProps = React.PropsWithChildren<
  DefaultProps & {header?: React.ReactNode}
>;
const Centered = ({
  children,
  header,
  ...useProtectedAccessProps
}: CenteredProps) => {
  return (
    <Layout {...useProtectedAccessProps}>
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

const Wrapper = styled(Box)(({theme}) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default Centered;

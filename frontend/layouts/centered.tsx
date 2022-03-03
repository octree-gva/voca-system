import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Layout, {DefaultProps} from './default';

export type CenteredProps = React.PropsWithChildren<DefaultProps>;
const Centered = ({children, ...useProtectedAccessProps}: CenteredProps) => {
  return (
    <Layout {...useProtectedAccessProps}>
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

const Wrapper = styled(Box)(({theme}) => ({
  padding: theme.spacing(),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default Centered;

import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Meta, {Metas} from '../containers/Meta';
import Loader from '../components/Loader';
import useProtectedAccess, {
  useProtectedAccessProps,
} from '../hooks/useProtectedAccess';
export type DefaultProps = React.PropsWithChildren<
  {
    metas?: Metas;
  } & useProtectedAccessProps
>;

const Default = ({
  metas,
  children,
  ...useProtectedAccessProps
}: DefaultProps) => {
  const {isAllowed, isLoading} = useProtectedAccess(useProtectedAccessProps);
  if (!isAllowed) return null;
  return (
    <Wrapper>
      <Meta metas={metas} />
      {isLoading ? <Loader /> : children}
    </Wrapper>
  );
};

const Wrapper = styled(Box)(() => ({
  minWidth: 320,
  maxWidth: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export default Default;

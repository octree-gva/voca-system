import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Meta, {Metas} from '../containers/Meta';
import Loader from '../components/Loader';
import useProtectedAccess, {
  useProtectedAccessProps,
} from '../hooks/useProtectedAccess';
import {useRouter} from 'next/router';
export type EmbedLayoutProps = React.PropsWithChildren<
  {
    metas?: Metas;
  } & useProtectedAccessProps
>;

const EmbedLayout = ({
  metas,
  children,
  ...useProtectedAccessProps
}: EmbedLayoutProps) => {
  const {isAllowed, isLoading} = useProtectedAccess(useProtectedAccessProps);
  const router = useRouter();
  const {width, height} = router.query;
  if (!isAllowed) return null;
  return (
    <Wrapper width={width} height={height}>
      <Meta metas={metas} />
      {isLoading ? <Loader /> : children}
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({width, height}) => ({
  minWidth: 320,
  maxWidth: width,
  minHeight: height,
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
}));

export default EmbedLayout;

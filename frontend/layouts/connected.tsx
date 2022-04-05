import React from 'react';
import Box from '@mui/material/Box';
import Default from './default';
import LeftBar from '../containers/LeftBar';
import TopBar from '../containers/TopBar';

type ConnectedLayoutProps = React.PropsWithChildren<
  {headerActions?: React.ReactNode}
>;

const ConnectedLayout = ({children, headerActions}: ConnectedLayoutProps) => {
  return (
    <Default>
      <Box pt="64px">
        <TopBar>
          {headerActions}
        </TopBar>
        <Box sx={{pl: {xs: 0, sm: '80px'}, pb: {xs: '64px', sm: 0}}}>
          <LeftBar />
          {children}
        </Box>
      </Box>
    </Default>
  );
};

export default ConnectedLayout;

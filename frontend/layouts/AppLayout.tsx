import React from 'react';
import Box from '@mui/material/Box';
import Default from './Common';
import SupportButton from '../containers/SupportButton';
import LeftBar from '../containers/LeftBar';
import TopBar from '../containers/TopBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';

type MainLayoutProps = React.PropsWithChildren<{
  headerActions?: React.ReactNode;
}>;

const MainLayout = ({children, headerActions}: MainLayoutProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const offset = matches ? 7 : 0;
  return (
    <Default>
      <Box>
        <TopBar>{headerActions}</TopBar>
        <Box
          sx={{
            pl: {xs: 0, sm: '80px'},
            pb: {xs: theme => theme.spacing(10), sm: 0},
          }}
        >
          <LeftBar />
          {children}
        </Box>
        <SupportButton offset={offset} />
      </Box>
    </Default>
  );
};

export default MainLayout;

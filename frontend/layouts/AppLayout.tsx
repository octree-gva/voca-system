import React from 'react';
import Box from '@mui/material/Box';
import Default from './Common';
import SupportButton from '../containers/SupportButton';
import LeftBar from '../containers/LeftBar';
import TopBar from '../containers/TopBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/system';
import Banner, {BannerProps} from '../components/Banner';

type AppLayoutProps = React.PropsWithChildren<{
  headerActions?: React.ReactNode;
  banner?: BannerProps;
}>;

const AppLayout = ({children, headerActions, banner}: AppLayoutProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const supportOffset = matches ? 7 : 0;
  return (
    <Default>
      {banner && (
        <Banner
          message={banner.message}
          open={banner.open}
          onClear={banner.onClear}
        />
      )}
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
        <SupportButton offset={supportOffset} />
      </Box>
    </Default>
  );
};

export default AppLayout;

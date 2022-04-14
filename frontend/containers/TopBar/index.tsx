import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import {useSession, signOut} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import UserPicture from './UserPicture';
import Logo from '../../components/Logo';

const TopBar = ({children}: {children?: React.ReactNode}) => {
  const session = useSession();
  const {t} = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box flexGrow={1} pt="64px">
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          paddingLeft: '40px',
          bgcolor: theme => theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <Box flexGrow={1}>
            <Logo height={25} width={100} />
          </Box>
          {children}
          {session.status === 'authenticated' ? (
            <Fab
              aria-label="menu"
              sx={{mr: 2}}
              color="primary"
              aria-controls={open ? 'menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpen}
            >
              <UserPicture />
            </Fab>
          ) : (
            <Link href="/auth/login" passHref>
              <Button color="inherit">{t('TopBar.login')}</Button>
            </Link>
          )}
          <Menu
            id="menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => router.push('/account')}>
              {t('TopBar.account')}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {t('TopBar.notifications')}
              <Chip
                label={t('generic.coming_soon')}
                color="success"
                sx={{marginLeft: '2em'}}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                signOut();
                handleClose();
              }}
            >
              {t('TopBar.logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;

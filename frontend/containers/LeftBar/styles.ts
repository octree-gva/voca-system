import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: ({bannerOffset}) => ({
    width: '80px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      paddingTop: `${80 + bannerOffset}px`,
      width: '80px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      left: 0,
      top: 0,

      [theme.breakpoints.down('sm')]: {
        bottom: 0,
        top: 'auto',
        paddingTop: 0,
        height: '64px',
        width: '100%',
        flexDirection: 'row',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      },
    },
  }),
  fab: {
    margin: `${theme.spacing(2)} auto`,

    [theme.breakpoints.down('sm')]: {
      margin: '8px auto',
      width: '48px',
      height: '48px',
    },
  },
}));

export default useStyles;

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material/styles';
import {useEffect} from 'react';
import {useElementSize, useEventListener} from 'usehooks-ts';
import useBannerStore from '../../stores/useBannerStore';

export interface BannerProps {
  message: string;
  open: boolean;
  onClear?: () => void;
}

const Banner = (props: BannerProps) => {
  const {message, open, onClear} = props;
  const classes = useStyles({open});
  const [bannerRef, {height}] = useElementSize();
  const setBannerHeight = useBannerStore(s => s.setBannerHeight);
  const setBannerOffset = useBannerStore(s => s.setBannerOffset);
  useEffect(() => setBannerHeight({height}), [setBannerHeight, height]);

  useEventListener('scroll', () => {
    if (typeof document != 'undefined' && open) {
      const y = window.scrollY;
      if (y > height) {
        setBannerOffset({offset: 0});
      }
      if (y <= height) {
        setBannerOffset({offset: height - y});
      }
    }
  });

  return (
    <div className={classes.banner} ref={bannerRef}>
      <Typography>{message}</Typography>
      <Button
        className={classes.clear}
        onClick={e => {
          e.stopPropagation();
          if (onClear) onClear();
          setBannerHeight({height: 0});
        }}
      >
        <CloseIcon />
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  banner: ({open}) => ({
    position: 'relative',
    background: theme.palette.accent.main,
    width: '100%',
    padding: `${open ? '12px' : '0'} 80px`,
    textAlign: 'left',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    maxHeight: open ? 'none' : 0,
  }),
  clear: {
    position: 'absolute',
    right: '12px',
    bottom: '0',
    minWidth: '44px',
    padding: '12px',
    lineHeight: '1.4em',
    color: 'inherit',
    border: 0,
  },
  htmlReset: {
    '& a': {
      color: 'inherit',
      margin: 0,
    },
    '& p': {
      margin: 0,
    },
  },
}));

export default Banner;

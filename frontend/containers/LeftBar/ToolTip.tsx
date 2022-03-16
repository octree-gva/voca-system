import Fab from '@mui/material/Fab';
import ToolTip from '@mui/material/ToolTip';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material/SvgIcon';
import useStyles from './styles';

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap>;
  title: string;
  href: string;
}

const LeftBarToolTip = ({Icon, title, href}: Props) => {
  const classes = useStyles();
  return (
    <ToolTip title={title} placement="right">
      <Fab
        className={classes.fab}
        color="primary"
        size="large"
        target="_blank"
        href={href}
        rel="noopener"
      >
        <Icon />
      </Fab>
    </ToolTip>
  );
};

export default LeftBarToolTip;

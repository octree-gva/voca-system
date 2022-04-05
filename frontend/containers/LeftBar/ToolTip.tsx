import Fab from '@mui/material/Fab';
import ToolTip from '@mui/material/Tooltip';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import {SvgIconTypeMap} from '@mui/material/SvgIcon';
import useStyles from './styles';
import { FabTypeMap } from '@mui/material';

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap>;
  title: string;
  href: string;
  color: FabTypeMap['props']['color'];
}

const LeftBarToolTip = ({Icon, title, href, color}: Props) => {
  const classes = useStyles();
  return (
    <ToolTip title={title} placement="right">
      <Fab
        className={classes.fab}
        color={color}
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

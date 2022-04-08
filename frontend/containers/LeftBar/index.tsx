import Drawer from '@mui/material/Drawer';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import HikingRoundedIcon from '@mui/icons-material/HikingRounded';
import {useTranslation} from 'react-i18next';
import useStyles from './styles';
import ToolTip from './ToolTip';

const Dashboard = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <ToolTip
        color="secondary"
        title={t('LeftBar.knowledgeBase')}
        href="https://guides.voca.city/docs/intro"
        Icon={MenuBookRoundedIcon}
      />
      <ToolTip
        color="accent"
        title={t('LeftBar.community')}
        href="https://decidim.org/community/"
        Icon={HandshakeRoundedIcon}
      />
      <ToolTip
        color="altAccent"
        title={t('LeftBar.roadmap')}
        href="/"
        Icon={HikingRoundedIcon}
      />
    </Drawer>
  );
};

export default Dashboard;

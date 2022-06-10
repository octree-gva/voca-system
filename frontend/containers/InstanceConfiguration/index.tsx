import Domains from './Domains';
import {InstanceSettingsPage} from '../../layouts/InstanceSettings';  

const InstanceConfiguration: InstanceSettingsPage = ({instance}) => {
  return (
    <Domains instance={instance} />
  );
};

export default InstanceConfiguration;

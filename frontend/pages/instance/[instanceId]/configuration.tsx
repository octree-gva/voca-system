import ConnectedLayout from '../../../layouts/AppLayout';
import InstanceSettingsLayout from '../../../layouts/InstanceSettings';
import InstanceConfiguration from '../../../containers/InstanceConfiguration';

const InstanceSettings = () => {
  return (
    <ConnectedLayout>
      <InstanceSettingsLayout Component={InstanceConfiguration} />
    </ConnectedLayout>
  );
};

export default InstanceSettings;

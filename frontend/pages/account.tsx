import ConnectedLayout from '../layouts/connected';
import AccountView from '../containers/AccountView';
import SupportButton from '../containers/SupportButton';

const Account = () => {
  return (
    <ConnectedLayout>
      <AccountView />
      <SupportButton/>
    </ConnectedLayout>
  );
};

export default Account;

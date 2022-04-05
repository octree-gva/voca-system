import ConnectedLayout from '../layouts/connected';
import AccountView from '../containers/AccountView';

const Account = () => {
  return (
    <ConnectedLayout>
      <AccountView />
    </ConnectedLayout>
  );
};

export default Account;

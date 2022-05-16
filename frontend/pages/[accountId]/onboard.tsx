import { useRouter } from 'next/router';
import CreateInstance from '../../containers/CreateInstance';
import Layout from '../../layouts/Centered';

const OnBoard = () => {
  const router = useRouter()
  const {
    query: { accountId },
  } = router
  return (
    <Layout>
      <CreateInstance
        open
        onClose={() => null}
        submitCallback={() => router.push(`/${accountId}/dashboard`)}
      />
    </Layout>
  );
};

export default OnBoard;

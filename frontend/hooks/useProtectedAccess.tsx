import useAuthStore from '../stores/useAuthStore';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo} from 'react';

export type useProtectedAccessProps = {
  publicAccess?: boolean;
  noRedirect?: boolean;
};
export type useProtectedAccessReturns = {
  isAllowed: boolean;
  isLoading: boolean;
};

const useProtectedAccess = ({
  publicAccess,
  noRedirect,
}: useProtectedAccessProps): useProtectedAccessReturns => {
  const session = useSession();
  const setUser = useAuthStore(useCallback(s => s.setUser, []));
  const router = useRouter();
  useEffect(() => {
    if (session.status !== 'authenticated') return;
    setUser(session.data.user || null);
  }, [session]);
  const isAllowed = useMemo(
    () => publicAccess || session.status === 'authenticated',
    [session, publicAccess]
  );
  const isLoading = useMemo(() => session.status === 'loading', [session]);
  useEffect(() => {
    if (!isLoading && !publicAccess && !noRedirect && !isAllowed)
      router.push('/400');
  }, [noRedirect, router, isAllowed, isLoading, publicAccess]);
  if (publicAccess) return {isAllowed: true, isLoading};
  if (!isAllowed) return {isAllowed, isLoading};
  return {isAllowed, isLoading};
};

export default useProtectedAccess;

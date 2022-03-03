import create from 'zustand';
import {SessionContextValue} from 'next-auth/react';
export type UserData =
  | Exclude<SessionContextValue['data'], null>['user']
  | null;
export type State = {
  user: UserData;
  setUser: (user: UserData | null) => void;
};

const useAuthStore = create<State>(set => ({
  user: null,
  setUser: user => set({user}),
}));

export default useAuthStore;

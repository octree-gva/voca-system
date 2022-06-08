import create from 'zustand';

type BannerState = {
  height: number;
  offset: number;
};

type BannerStore = BannerState & {
  setBannerHeight: ({height: number}: {height: number}) => void;
  setBannerOffset: ({offset: number}: {offset: number}) => void;
};

const useBannerStore = create<BannerStore>(set => ({
  height: 0,
  setBannerHeight: store => {
    set(s => ({...s, offset: store.height, height: store.height}));
  },
  offset: 0,
  setBannerOffset: store => {
    set(s => ({...s, offset: store.offset}));
  },
}));

export default useBannerStore;

import { create } from 'zustand';

interface State {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

export const useStore = create<State>((set) => ({
    isLoggedIn: false,
    logIn: () => set({ isLoggedIn: true }),
    logOut: () => set({ isLoggedIn: false }),
}));
import { create } from "zustand";

interface NavigationState {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  activeLink: "/", // default active link
  setActiveLink: (link) => set({ activeLink: link }),
}));

export default useNavigationStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- Types ---
export type Status = "accepted" | "pending";
export type OfferType = "normal" | "guest" | "homepage";

export type NormalOfferData = {
  linkInsertionPrice1: number | null;
  linkInsertionPrice2: number | null;
  articleIncluded: "yes" | "no";
  articleWordCount: "unlimited" | "client-provided";
  minWords: number | null;
  maxWords: number | null;
  allowDofollow: "yes" | "no";
  allowedLinkTypes: "onlybrands" | "branded" | "mixed" | "alllinks";
  taggingPolicy: "paid-articles" | "advertiser" | "sponsored" | "all-links";
  advertiserLinks: "unlimited" | "client-provided";
  minLinks: number | null;
  maxLinks: number | null;
  otherLinksPolicy: "yes" | "no";
  contentRules: string;
};

export type HomepageLinkOfferData = {
  price: number | null;
  offerGuidelines: string;
};

export type GreyNichePrice = {
  guestPosting: number;
  linkInsertion: number;
};

export type GreyNicheOfferData = {
  samePriceForAll: boolean;
  prices: Record<string, GreyNichePrice[]>;
};

export type WebsiteFormData = {
  webStatus: Status;
  websiteUrl: string;
  primaryLanguage: string;
  trafficSource: string;
  categories: string[];
  description: string;
  isOwner: boolean;
  offerType: OfferType;
  normalOffer: NormalOfferData;
  greyNicheOffer: GreyNicheOfferData;
  homepageOffer: HomepageLinkOfferData;
};

export type WebsiteSubmission = WebsiteFormData & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type WebsiteFormActions = {
  setWebsiteStatus: (status: Status) => void;
  setWebsiteUrl: (url: string) => void;
  setPrimaryLanguage: (language: string) => void;
  setTrafficSource: (source: string) => void;
  setCategories: (categories: string[]) => void;
  setDescription: (description: string) => void;
  setIsOwner: (isOwner: boolean) => void;
  setOfferType: (type: OfferType) => void;
  setNormalOffer: (data: Partial<NormalOfferData>) => void;
  setGreyNicheOfferSamePrice: (value: boolean) => void;
  setGreyNicheOfferPrice: (
    niche: string,
    rowIndex: number,
    field: keyof GreyNichePrice,
    value: number
  ) => void;
  setHomepageOfferPrice: (price: number) => void;
  setHomepageOfferGuidelines: (guidelines: string) => void;
  resetForm: () => void;
  addSubmission: (data?: WebsiteFormData) => string;
  getSubmissionById: (id: string) => WebsiteSubmission | undefined;
  getSubmissions: () => WebsiteSubmission[];
  deleteSubmission: (id: string) => void;
  updateSubmission: (id: string, data: Partial<WebsiteFormData>) => void;
  clearSubmissions: () => void;
};

export type WebsiteFormStore = WebsiteFormData & {
  submissions: WebsiteSubmission[];

} & WebsiteFormActions;

// Optional type if you want to use it in migration
export type PersistedWebsiteFormStore = WebsiteFormStore;

// --- Initial States ---
export const initialNormalOffer: NormalOfferData = {
  linkInsertionPrice1: null,
  linkInsertionPrice2: null,
  articleIncluded: "yes",
  articleWordCount: "unlimited",
  minWords: null,
  maxWords: null,
  allowDofollow: "yes",
  allowedLinkTypes: "onlybrands",
  taggingPolicy: "paid-articles",
  advertiserLinks: "unlimited",
  minLinks: null,
  maxLinks: null,
  otherLinksPolicy: "yes",
  contentRules: "",
};

export const initialGreyNicheOffer: GreyNicheOfferData = {
  samePriceForAll: false,
  prices: {
    Gambling: [
      { guestPosting: 0, linkInsertion: 0 },
      { guestPosting: 0, linkInsertion: 0 },
    ],
    Crypto: [
      { guestPosting: 0, linkInsertion: 0 },
      { guestPosting: 0, linkInsertion: 0 },
    ],
    Adult: [
      { guestPosting: 0, linkInsertion: 0 },
      { guestPosting: 0, linkInsertion: 0 },
    ],
  },
};

export const initialHomepageOffer: HomepageLinkOfferData = {
  price: null,
  offerGuidelines: "",
};

export const initialState: WebsiteFormData = {
  webStatus: "pending",
  websiteUrl: "",
  primaryLanguage: "US",
  trafficSource: "US",
  categories: [],
  description: "",
  isOwner: false,
  offerType: "normal",
  normalOffer: initialNormalOffer,
  greyNicheOffer: initialGreyNicheOffer,
  homepageOffer: initialHomepageOffer,
};

// --- Store ---
export const useWebsiteFormStore = create<WebsiteFormStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      submissions: [],

      // Form field setters
      setWebsiteStatus: (webStatus) => set({ webStatus }),
      setWebsiteUrl: (url) => set({ websiteUrl: url }),
      setPrimaryLanguage: (language) => set({ primaryLanguage: language }),
      setTrafficSource: (source) => set({ trafficSource: source }),
      setCategories: (categories) => set({ categories }),
      setDescription: (description) => set({ description }),
      setIsOwner: (isOwner) => set({ isOwner }),
      setOfferType: (type) => set({ offerType: type }),

      setNormalOffer: (data) =>
        set((state) => ({
          normalOffer: { ...state.normalOffer, ...data },
        })),

      setGreyNicheOfferSamePrice: (value) =>
        set((state) => ({
          greyNicheOffer: { ...state.greyNicheOffer, samePriceForAll: value },
        })),

      setGreyNicheOfferPrice: (niche, rowIndex, field, value) =>
        set((state) => {
          const newPrices = { ...state.greyNicheOffer.prices };

          if (state.greyNicheOffer.samePriceForAll) {
            Object.keys(newPrices).forEach((key) => {
              newPrices[key][rowIndex][field] = value;
            });
          } else {
            newPrices[niche][rowIndex][field] = value;
          }

          return {
            greyNicheOffer: { ...state.greyNicheOffer, prices: newPrices },
          };
        }),

      setHomepageOfferPrice: (price) =>
        set((state) => ({
          homepageOffer: { ...state.homepageOffer, price },
        })),

      setHomepageOfferGuidelines: (offerGuidelines) =>
        set((state) => ({
          homepageOffer: { ...state.homepageOffer, offerGuidelines },
        })),

      resetForm: () => set(initialState),

      // Submissions
      addSubmission: (data) => {
        const formData = data || get();
        const now = new Date().toISOString();
        const newSubmission: WebsiteSubmission = {
          ...formData,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          submissions: [newSubmission, ...state.submissions],
        }));

        return newSubmission.id;
      },

      getSubmissionById: (id) => {
        return get().submissions.find((sub) => sub.id === id);
      },

      getSubmissions: () => {
        return get().submissions;
      },

      deleteSubmission: (id) => {
        set((state) => ({
          submissions: state.submissions.filter((sub) => sub.id !== id),
        }));
      },

      updateSubmission: (id, data) => {
        const now = new Date().toISOString();
        set((state) => ({
          submissions: state.submissions.map((sub) =>
            sub.id === id ? { ...sub, ...data, updatedAt: now } : sub
          ),
        }));
      },

      clearSubmissions: () => {
        set({ submissions: [] });
      },
    }),
    {
      name: "website-form-storage",
      storage: createJSONStorage<WebsiteFormStore>(() => localStorage),
      version: 1,

      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Partial<WebsiteFormStore>;

        if (!state) return initialState;

        // Optional cleanup for version 0
        if (version === 0) {
          // no need to touch submissions
        }

        return {
          ...initialState,
          ...state,
          submissions: state.submissions || [],
        };
      },
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type NormalOfferData = {
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

type HomepageLinkOfferData = {
  price: number | null;
  offerGuidelines: string;
};

type GreyNichePrice = {
  guestPosting: number;
  linkInsertion: number;
};

type GreyNicheOfferData = {
  samePriceForAll: boolean;
  prices: Record<string, GreyNichePrice[]>;
};

type Status = "accepted" | "pending";
type OfferType = "normal" | "guest" | "homepage";

type WebsiteFormData = {
  isLoading: boolean;
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
export type Website = {
  id: string;
  websiteUrl: string;
  primaryLanguage: string;
  trafficSource: string;   
  categories: string[];   
};
export interface WebsiteFormStoreState {
  submissions: Website[];
  isLoading: boolean;
  setSubmissions: (data: Website[]) => void;
  setIsLoading: (loading: boolean) => void;
}
type WebsiteFormActions = {
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
  submissions: Website[];
  resetForm: () => void;
  addSubmission: (data?: WebsiteFormData) => string;
  getSubmissionById: (id: string) => WebsiteSubmission | undefined;
  deleteSubmission: (id: string) => void;
  updateSubmission: (id: string, data: Partial<WebsiteFormData>) => void;
  clearSubmissions: () => void;
};

const initialNormalOffer: NormalOfferData = {
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

const initialGreyNicheOffer: GreyNicheOfferData = {
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

const initialHomepageOffer: HomepageLinkOfferData = {
  price: null,
  offerGuidelines: "",
};

const initialFormState: WebsiteFormData = {
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
  isLoading: false,
};

export type WebsiteFormStore = WebsiteFormData & {
  submissions: WebsiteSubmission[];
  
 
} & WebsiteFormActions;

const useWebsiteFormStore = create<WebsiteFormStore>()(
  persist(
    (set, get) => ({
      ...initialFormState,
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

      // Form reset (only form, not submissions)
      resetForm: () => {
        set((state) => ({
          ...state,
          ...initialFormState,
        }));
      },

      // Submission logic
      addSubmission: (data) => {
        const now = new Date().toISOString();
        const formData: WebsiteFormData = data || {
          isLoading: get().isLoading,
          webStatus: get().webStatus,
          websiteUrl: get().websiteUrl,
          primaryLanguage: get().primaryLanguage,
          trafficSource: get().trafficSource,
          categories: get().categories,
          description: get().description,
          isOwner: get().isOwner,
          offerType: get().offerType,
          normalOffer: get().normalOffer,
          greyNicheOffer: get().greyNicheOffer,
          homepageOffer: get().homepageOffer,
        };

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

      //  getSubmissionById: (id:number | string) => get().submissions.find((sub) => sub.id === id),
      getSubmissionById: (id) => get().submissions.find((sub) => sub.id === id),

      deleteSubmission: (id) =>
        set((state) => ({
          submissions: state.submissions.filter((sub) => sub.id !== id),
        })),

      updateSubmission: (id, data) =>
        set((state) => ({
          submissions: state.submissions.map((sub) =>
            sub.id === id
              ? { ...sub, ...data, updatedAt: new Date().toISOString() }
              : sub
          ),
        })),

      clearSubmissions: () => set({ submissions: [] }),
    }),
    {
      name: "website-form-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        webStatus: state.webStatus,
        websiteUrl: state.websiteUrl,
        primaryLanguage: state.primaryLanguage,
        trafficSource: state.trafficSource,
        categories: state.categories,
        description: state.description,
        isOwner: state.isOwner,
        offerType: state.offerType,
        normalOffer: state.normalOffer,
        greyNicheOffer: state.greyNicheOffer,
        homepageOffer: state.homepageOffer,
        submissions: state.submissions,
      }),
    }
  )
);

export default useWebsiteFormStore;

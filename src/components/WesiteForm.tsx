import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CountrySelect } from "./custom/CountrySelect";
import { MultiSelect } from "./custom/MultiSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GreyNicheOffer from "./tabs/GreyNichOffer";
import HomepageLinkOffer from "./tabs/HomeLink";
import NormalOffer from "./tabs/NormalOffer";
import useWebsiteFormStore from "@/store/WebsiteStore";
import { ApproveCard } from "./ApproveCard";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const categories: string[] = [
  "Animals / Pets",
  "Art",
  "Auto",
  "Beauty",
  "Blogging",
  "Business / Entrepreneur",
  "Marijuana / Vaporizers",
  "Directory",
  "Education",
  "Energy & Solar Energy",
  "Entertainment & Music",
  "Environment",
  "Events",
  "Family / Parenting",
  "Fashion",
  "Finance",
  "Food",
  "Gambling",
  "Gaming",
  "General",
  "Health & Fitness",
  "Home & Garden",
  "Italian Sites",
  "Legal",
  "Lifestyle/Lifestyle",
  "Marijuana / Vaporizers",
  "Marketing",
  "Medical",
  "News",
  "Other",
  "Outdoors",
  "Photography",
  "Politics",
  "Real Estate",
  "SEO",
  "Sex & Adult",
  "Shopping",
];
type FormData = {
  website: string;
  primaryLanguage: string;
  trafficSource: string;
  description: string;
};

const schema = yup.object({
  website: yup
    .string()
    .required("Website URL is required")
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/,
      "Enter a valid URL"
    ),
  primaryLanguage: yup.string().required("Primary Language is required"),
  trafficSource: yup.string().required("Majority traffic is required"),
  description: yup.string().required("Description is required"),
});
const WebsiteForm: React.FC = () => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    websiteUrl,
    primaryLanguage,
    trafficSource,
    categories: selectedCategories,
    description,
    isOwner,
    offerType,
    webStatus,
    resetForm,
    setWebsiteStatus,
    setWebsiteUrl,
    setPrimaryLanguage,
    setTrafficSource,
    setCategories,
    setDescription,
    setIsOwner,
    setOfferType,
    getSubmissionById,
    addSubmission,
    updateSubmission,
   
  } = useWebsiteFormStore();

  useEffect(() => {
   
    if (id) {
      const existingSubmission = getSubmissionById(id);
      if (existingSubmission) {
        setWebsiteUrl(existingSubmission?.websiteUrl);
        setPrimaryLanguage(existingSubmission.primaryLanguage);
        setTrafficSource(existingSubmission.trafficSource);
        setCategories(existingSubmission.categories);
        setOfferType(existingSubmission?.offerType);
        reset({
          website: existingSubmission.websiteUrl,
          primaryLanguage: existingSubmission.primaryLanguage,
          trafficSource: existingSubmission.trafficSource,
          description: existingSubmission.description,
        });
        setCategories(existingSubmission.categories);
        setIsOwner(existingSubmission.isOwner);
        setOfferType(existingSubmission.offerType);
        setWebsiteStatus(existingSubmission.webStatus || "pending");
      }
    } else {
      resetForm();
      reset({
        website: "",
        primaryLanguage: "",
        trafficSource: "",
        description: "",
      });
      setCategories([])
      // console.log(categories);
    }
  }, [id, reset, getSubmissionById,resetForm,setPrimaryLanguage,setTrafficSource,setCategories,setOfferType]);

  const onSubmit = (data: FormData) => {
    setWebsiteUrl(data.website);
    setPrimaryLanguage(data.primaryLanguage);
    setTrafficSource(data.trafficSource);
    setDescription(data.description);
   
    if (id) {
      updateSubmission(id, {
        websiteUrl: data.website,
        primaryLanguage: data.primaryLanguage,
        trafficSource: data.trafficSource,
        categories: selectedCategories,
        description: data.description,
        isOwner,
        offerType,
        webStatus,
      });
      navigate("/mywebsite");
    } else {
      const submissionId = addSubmission();
      console.log("New submission created with ID:", submissionId);
      navigate("/mywebsite");
    }
  };
  return (
    <>
      <div className=" lg:py-[56px] items-center">
        <ApproveCard
          status={webStatus}
          onAccept={() => setWebsiteStatus("accepted")}
        />
      </div>
      <form
        // onSubmit={handleSubmit}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <h3 className="text-[24px] px-4 lg:px-0 font-bold dm-text-h1 text-[#0F0C1B] pb-4 lg:pb-[17px]">
            Website detail
          </h3>
        </div>
        <div className="px-2 lg:p-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] w-full lg:w-[856px]">
            <div className="max-w-[264px] space-y-[8px]">
              <Label
                htmlFor="website"
                className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1"
              >
                Enter website
              </Label>
              <Input
                id="website"
                placeholder="Website URL"
                className="w-full"
                value={websiteUrl}
                {...register("website")}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website.message}</p>
              )}
            </div>

            <div className="max-w-[264px] space-y-[8px] ">
              <Label className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1">
                Website’s Primary Language
              </Label>
              {/* <CountrySelect
                defaultCountry={primaryLanguage}
                withLanguage
                onChange={(value) => setPrimaryLanguage(value)}
              /> */}
              <Controller
                name="primaryLanguage"
                defaultValue={primaryLanguage}
                control={control}
                rules={{ required: "Primary Language is required" }}
                render={({ field, fieldState }) => (
                  <CountrySelect
                    defaultCountry={field.value}
                    value={field.value}
                    onChange={field.onChange}
                    withLanguage
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <div className="max-w-[264px] space-y-[8px] ">
              <Label className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1">
                Your Majority of traffic comes from
              </Label>
              <Controller
                name="trafficSource"
                defaultValue={trafficSource}
                control={control}
                rules={{ required: "Majority of traffic is required" }}
                render={({ field, fieldState }) => (
                  <CountrySelect
                    defaultCountry={field.value}
                    value={field.value}
                    onChange={field.onChange}
                    withLanguage
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-1 pt-[32px]">
            <Label className="pb-[8px] font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1">
              Main Category
            </Label>
            <MultiSelect
              options={categories}
              defaultSelected={selectedCategories}
              onChange={setCategories}
            />
          </div>

          <div className="space-y-1 pt-[32px]">
            <Label
              htmlFor="description"
              className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1"
            >
              Description of Website
            </Label>
            <Textarea
              id="description"
              placeholder="Description"
              rows={4}
              value={description}
              {...register("description")}
              onChange={(e) => setDescription(e.target.value)}
            />

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-[31px]">
            <Checkbox
              id="ownership"
              checked={isOwner}
              onCheckedChange={(checked) => setIsOwner(!!checked)}
            />
            <Label
              htmlFor="ownership"
              className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1"
            >
              I am the owner of the website
            </Label>
          </div>
          <div className="space-y-6 pt-4 lg:pt-[64px]">
            <h3
              className="text-[24px] font-bold dm-text-h1 text-[#0F0C1B] pb-[30px] 
        lg:pb-[20px]"
            >
              Create offer
            </h3>

            <Tabs
              defaultValue={offerType}
              className="w-full bg-[#FDFCFF] px-0 lg:px-[24px] shadow-[0px_1px_2px_0px_#0000000D]"
              onValueChange={(value) =>
                setOfferType(value as "normal" | "guest" | "homepage")
              }
            >
              <TabsList
                className="flex flex-col md:flex-row lg:flex-row border-b border-gray-200 gap-4 
          lg:gap-[40px] h-[48px]"
              >
                <TabsTrigger
                  value="normal"
                  className="p-[10px] border-b-2 border-transparent w-full
               data-[state=active]:border-b-[#613FDD] data-[state=active]:bg-transparent
                font-semibold text-[18px] leading-[28px]
                tracking-[0px] dm-text-h1 "
                >
                  Normal offer
                </TabsTrigger>
                <TabsTrigger
                  value="guest"
                  className="p-[10px] border-b-2 border-transparent
              data-[state=active]:border-b-[#613FDD] data-[state=active]:bg-transparent font-semibold text-[18px] leading-[28px]
               tracking-[0px] dm-text-h1"
                >
                  Grey Niche offer
                </TabsTrigger>
                <TabsTrigger
                  value="homepage"
                  className="p-[10px] border-b-2 border-transparent
              data-[state=active]:border-b-[#613FDD] font-semibold text-[18px] leading-[28px]
               tracking-[0px] dm-text-h1"
                >
                  Homepage link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="normal" className="space-y-4">
                <NormalOffer />
              </TabsContent>

              <TabsContent value="guest" className="space-y-4">
                <GreyNicheOffer />
              </TabsContent>

              <TabsContent value="homepage" className="space-y-4">
                <HomepageLinkOffer/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="mt-8 flex justify-end pb-7">
          <Button
            type="submit"
            className="bg-[#613FDD] hover:bg-[#4d32b3] cursor-pointer"
          >
            {id ? "Update Website" : "Submit Website"}
          </Button>
          {id && (
            <Button
              type="button"
              variant="destructive"
              className="ml-4 cursor-pointer"
              onClick={() => {
                navigate("/mywebsite");
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default WebsiteForm;

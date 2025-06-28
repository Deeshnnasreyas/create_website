import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useWebsiteFormStore from "@/store/WebsiteStore";

const HomepageLinkOffer: React.FC = () => {
  const { homepageOffer, setHomepageOfferPrice, setHomepageOfferGuidelines } =
    useWebsiteFormStore();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1 text[#0F0C1B99] mb-[8px]">
          Price
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            $
          </span>
          <Input
            type="number"
            placeholder=""
            className="pl-7"
            min={0}
            value={homepageOffer.price ?? ""}
            onChange={(e) => setHomepageOfferPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1 text[#0F0C1B99] mb-[8px]">
          Offer Guidelines
        </Label>
        <Textarea
          placeholder="Description"
          rows={4}
          value={homepageOffer.offerGuidelines}
          onChange={(e) => setHomepageOfferGuidelines(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HomepageLinkOffer;

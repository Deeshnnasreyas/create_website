import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useWebsiteFormStore from "@/store/WebsiteStore";
const niches = ["Gambling", "Crypto", "Adult"];

const GreyNicheOffer: React.FC = () => {
  const { greyNicheOffer, setGreyNicheOfferSamePrice, setGreyNicheOfferPrice } =
    useWebsiteFormStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="same-price"
          checked={greyNicheOffer.samePriceForAll}
          onCheckedChange={(checked) =>
            setGreyNicheOfferSamePrice(checked as boolean)
          }
        />
        <Label htmlFor="same-price">
          I offer same price for all grey niches
        </Label>
      </div>

      {[0, 1].map((row) => (
        <div key={row} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {niches.map((niche) => (
            <div key={`${niche}-${row}`} className="space-y-3">
              <h4 className="font-semibold  text[#0F0C1B99] opacity-[60%] text-[16px] leading-[24px] tracking-[-0.25px] dm-text-h1">
                {niche}
              </h4>

              <div>
                <Label
                  className={`font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1 
               text[#0F0C1B99] mb-[8px] ${
                 greyNicheOffer.samePriceForAll === true &&
                 "text-[#0F0C1B99] opacity-[60%]"
               }`}
                >
                  Price for Guest Posting
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </span>
                  <Input
                    value={greyNicheOffer.prices[niche][row].guestPosting}
                    type="number"
                    className={`pl-7 ${
                      greyNicheOffer.samePriceForAll === true && "bg-[#EAEAEA]"
                    }`}
                    placeholder=""
                    min={0}
                    onChange={(e) =>
                      setGreyNicheOfferPrice(
                        niche,
                        row,
                        "guestPosting",
                        Number(e.target.value)
                      )
                    }
                    disabled={greyNicheOffer.samePriceForAll === true}
                  />
                </div>
              </div>

              <div>
                <Label
                  className={`font-medium text-[14px] leading-[20px] tracking-[0px] dm-text-h1  text[#0F0C1B99] mb-[8px] ${
                    greyNicheOffer.samePriceForAll === true &&
                    "text-[#0F0C1B99] opacity-[60%]"
                  }`}
                >
                  Price for Link Insertion
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className={`pl-7 ${
                      greyNicheOffer.samePriceForAll === true && "bg-[#EAEAEA]"
                    }`}
                    placeholder=""
                    min={0}
                    disabled={greyNicheOffer.samePriceForAll === true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GreyNicheOffer;

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import useWebsiteFormStore from "@/store/WebsiteStore";

const NormalOffer: React.FC = () => {
  const { normalOffer, setNormalOffer } = useWebsiteFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNormalOffer({
      [name]: value === "" ? null : Number(value),
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNormalOffer({ [name]: value });
  };

  const handleRadioChange = (
    field: keyof typeof normalOffer,
    value: string
  ) => {
    setNormalOffer({ [field]: value });
  };

  return (
    <div>
      <div className="space-y-2 flex flex-col md:flex-row lg:flex-row items-center pt-[50px] lg:pt-[48px] gap-4 lg:gap-[48px] pb-[24px]">
        <div className="grid w-full max-w-sm items-center gap-[8px]">
          <Label htmlFor="linkInsertionPrice1">Guest posting</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm pointer-events-none">
              $
            </span>
            <Input
              id="linkInsertionPrice1"
              name="linkInsertionPrice1"
              type="number"
              placeholder="Guest posting"
              className="pl-7"
              min={0}
              value={normalOffer.linkInsertionPrice1 ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-[8px]">
          <Label htmlFor="linkInsertionPrice2">Link insertion</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm pointer-events-none">
              $
            </span>
            <Input
              id="linkInsertionPrice2"
              name="linkInsertionPrice2"
              type="number"
              placeholder="Link insertion"
              className="pl-7"
              min={0}
              value={normalOffer.linkInsertionPrice2 ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="pt-[20px] lg:pt-[64px]">
        <h2 className="text-[24px] font-semibold pb-[20px] text-[#0F0C1B] dm-text-h1">
          Article specification
        </h2>

        <div className="flex flex-col lg:flex-row lg:p-[24px] gap-[20px] lg:gap-[80px]">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Is writing of an article included in the offer?
              </Label>
              <RadioGroup
                value={normalOffer.articleIncluded}
                onValueChange={(value) =>
                  handleRadioChange("articleIncluded", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="yes" id="article-yes" />
                  <Label
                    htmlFor="article-yes"
                    className="font-normal text-[14px] leading-[20px] tracking-[0.25px] inter-text text-[#0F0C1B] opacity-60"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="article-no" />
                  <Label
                    htmlFor="article-no"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    No, the advertiser (client) needs to provide the content
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Number of words in the article
              </Label>
              <RadioGroup
                value={normalOffer.articleWordCount}
                onValueChange={(value) =>
                  handleRadioChange("articleWordCount", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="unlimited" id="word-unlimited" />
                  <Label
                    htmlFor="word-unlimited"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Length of the article is not limited.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client-provided" id="word-client" />
                  <Label
                    htmlFor="word-client"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    No, the advertiser (client) needs to provide the content
                  </Label>
                </div>
              </RadioGroup>
              {normalOffer.articleWordCount === "client-provided" && (
                <div className="flex pl-[24px] pt-[10px] gap-[47px]">
                  <div className="w-[95px] h-[40px]">
                    <Input
                      name="minWords"
                      type="number"
                      min={0}
                      className="w-full h-auto p-[10px]"
                      placeholder="Min"
                      value={normalOffer.minWords ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-[95px] h-[40px]">
                    <Input
                      name="maxWords"
                      type="number"
                      min={0}
                      className="w-full h-auto p-[10px]"
                      placeholder="Max"
                      value={normalOffer.maxWords ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                I allow DOFOLLOW links in the article
              </Label>
              <RadioGroup
                value={normalOffer.allowDofollow}
                onValueChange={(value) =>
                  handleRadioChange("allowDofollow", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="yes" id="dofollow-yes" />
                  <Label
                    htmlFor="dofollow-yes"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dofollow-no" />
                  <Label
                    htmlFor="dofollow-no"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Type of links allowed:
              </Label>
              <RadioGroup
                value={normalOffer.allowedLinkTypes}
                onValueChange={(value) =>
                  handleRadioChange("allowedLinkTypes", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="onlybrands" id="onlybrands" />
                  <Label
                    htmlFor="onlybrands"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Only brand links, URL, navigational, graphic links.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branded" id="branded" />
                  <Label
                    htmlFor="branded"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Only branded and generic links.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label
                    htmlFor="mixed"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Also mixed links (partly exact match anchors).
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alllinks" id="alllinks" />
                  <Label
                    htmlFor="alllinks"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    All links, including exact match anchors.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Tagging articles policy:
              </Label>
              <RadioGroup
                value={normalOffer.taggingPolicy}
                onValueChange={(value) =>
                  handleRadioChange("taggingPolicy", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="paid-articles" id="paid-articles" />
                  <Label
                    htmlFor="paid-articles"
                    className="font-normal text-[14px] leading-[20px] tracking-[0.25px] inter-text text-[#0F0C1B] opacity-60"
                  >
                    We do not tag paid articles.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="advertiser" id="advertiser" />
                  <Label
                    htmlFor="advertiser"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Articles are tagged only at the advertiser's request.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="sponsored" id="sponsored" />
                  <Label
                    htmlFor="sponsored"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    We always tag articles: "Sponsored article".
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                A number of links to the advertiser in the article:
              </Label>
              <RadioGroup
                value={normalOffer.advertiserLinks}
                onValueChange={(value) =>
                  handleRadioChange("advertiserLinks", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="unlimited" id="links-unlimited" />
                  <Label
                    htmlFor="links-unlimited"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    Length of the article is not limited.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client-provided" id="links-client" />
                  <Label
                    htmlFor="links-client"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    A maximum number of links to the advertiser:
                  </Label>
                </div>
              </RadioGroup>
              {normalOffer.advertiserLinks === "client-provided" && (
                <div className="flex pl-[24px] pt-[10px] gap-[47px]">
                  <div className="w-[95px] h-[40px]">
                    <Input
                      name="minLinks"
                      type="number"
                      min={0}
                      className="w-full h-auto p-[10px]"
                      placeholder="Min"
                      value={normalOffer.minLinks ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-[95px] h-[40px]">
                    <Input
                      name="maxLinks"
                      type="number"
                      min={0}
                      className="w-full h-auto p-[10px]"
                      placeholder="Max"
                      value={normalOffer.maxLinks ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Other links in the article:
              </Label>
              <RadioGroup
                value={normalOffer.otherLinksPolicy}
                onValueChange={(value) =>
                  handleRadioChange("otherLinksPolicy", value)
                }
              >
                <div className="flex items-center space-x-2 pb-[12px]">
                  <RadioGroupItem value="yes" id="other-links-yes" />
                  <Label
                    htmlFor="other-links-yes"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    We allow links to other websites in the content of the
                    article.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="other-links-no" />
                  <Label
                    htmlFor="other-links-no"
                    className="font-normal text-[#0F0C1B] opacity-60 text-[14px] leading-[20px] tracking-[0.25px] inter-text"
                  >
                    We DO NOT allow links to other websites in the content of
                    the article.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-[40px]">
              <Label className="block pb-[24px] font-normal text-[#0F0C1B] text-[14px] leading-[20px] tracking-[0.25px] inter-text">
                Other content rules/specifications:
              </Label>
              <div className="space-y-2">
                <Textarea
                  name="contentRules"
                  placeholder="Description"
                  rows={6}
                  value={normalOffer.contentRules}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalOffer;

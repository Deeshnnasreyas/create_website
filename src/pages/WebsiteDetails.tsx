import WebsiteForm from "@/components/WesiteForm";
import useNavigationStore from "@/store/navigationStore";
import { useEffect } from "react";

const WebsiteDetails = () => {
  const pathParts = location.pathname.split("/");
  const basePath = `/${pathParts[1]}`;
  const { setActiveLink } = useNavigationStore();

  useEffect(() => {
    setActiveLink(basePath);
  }, [location.pathname]);

  return (
    <div className="mt-5 lg:mt-[80px]">
      <div className="container">
        <h1
          className="dm-text-h1 text-[#0F0C1B] pl-[30px] lg:pl-[62px] items-center pb-2 
          lg:pb-[62px] font-semibold text-[24px] lg:text-[32px]
          leading-[40px] tracking-[0px] "
        >
          Add a wesbite
        </h1>
        <div className="flex flex-col md:flex-row w-full pl-2 lg:pl-[38px]">
          <div className="md:w-1/2 w-full flex items-center justify-start">
            <div className="text-center md:text-left lg:pl-[24px] py-[40px] lg:py-[70px]">
              <p className="text-[24px] font-bold dm-text-h1 text-[#0F0C1B] pb-[17px] max-w-[406px]">
                Learn how to get best out of linksera
              </p>
              <ul className="pl-[15px] lg:pl-[24px]  list-disc font-inter font-normal text-[14px] leading-[20px] inter-text text-[#0F0C1B99] gap-[8px]">
                <li>How to add your website to the marketplace</li>
                <li>Setting pricing and niche/category filters</li>
                <li>Uploading sample articles or guidelines</li>
                <li>Editing or updating your website listing anytime</li>
                <li>Tips to make your listing stand out to buyers</li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex items-center justify-center px-2 lg:pr-[32px]">
            <div className="w-full aspect-video lg:max-w-[628px] h-[321px]">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sample Video"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]  lg:pt-[64px]  lg:pl-[38px]">
          <WebsiteForm />
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { HiPlus } from "react-icons/hi";
import React, { Suspense } from "react";
const Hero = () => {
  const navigate = useNavigate();
  const handleClick = (
    //  id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    navigate(`/mywebsite/new`);
  };
  const DataTable = React.lazy(() => import("@/components/DataTable"));
  return (
    <section id="website" className="bg-[#FDFCFF]">
      <div className="container">
        <div className="px-4 lg:p-[24px]">
          <h1
            className="dm-text-h1 text-[#0F0C1B] items-center pb-4 lg:pb-[74px] font-semibold text-[24px] 
          leading-[40px] tracking-[0px] "
          >
            All websites
          </h1>

          <div className="pb-4 lg:pb-[16px]">
            <Button
              variant="secondary"
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              size="custom"
              onClick={(e) => handleClick(e)}
            >
              <HiPlus className="w-4 h-4" />
              Add Wesite
            </Button>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-[24]">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;

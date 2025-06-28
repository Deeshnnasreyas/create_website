import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";

type Status = "accepted" | "pending";

interface CardProps {
  status: Status;
  onAccept?: () => void;
}

export const ApproveCard: React.FC<CardProps> = ({ status, onAccept }) => {
  const [open, setOpen] = React.useState(false);

  const isAccepted = status === "accepted";

  return (
    <div
      className={` border-1 border-[#e7e7ed]
 rounded-md px-[24px] py-[18px] transition w-full ${
   isAccepted
     ? "bg-[#FEFEFF] border-[#FEFEFF]"
     : "bg-[#FEFEFF] border-[#FEFEFF]"
 }`}
    >
      <div className="flex justify-between items-center ">
        <p className="text-sm font-medium text-gray-800">
          Hey, Accept Preconditions before you start the listing!
        </p>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium inline-flex items-center gap-1 px-2 py-1 rounded-full ${
              isAccepted
                ? "bg-[#34C7591A] text-[#09090B]"
                : "bg-[#FF95001A] text-[#09090B]"
            }`}
          >
            {isAccepted ? (
              <CheckCircle size={14} color="#34C759" />
            ) : (
              <Clock size={14} color="#FF9500" />
            )}
            {isAccepted ? "Accepted" : "Pending"}
          </span>

          <button onClick={() => setOpen((prev) => !prev)}>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-4 text-sm text-gray-600">
          <p>
            Before you can proceed with your listing, please make sure to review
            all required preconditions. Accepting these is mandatory to
            continue. It ensures your submission meets our platform standards
            and avoids delays.
          </p>
          <p>
            Listings that don’t meet these terms may be rejected. Take a moment
            to go through them carefully before moving ahead. Once accepted,
            you’ll be able to start listing right away.
          </p>
          {!isAccepted ? (
            <Button
              onClick={onAccept}
              className="bg-[#613FDD] hover:bg-[#4f35c3] py-[8px] px-[47px]"
            >
              Accept
            </Button>
          ) : (
            <span
              className={`text-xs font-medium inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#34C7591A] text-[#09090B]
              `}
            >
              <CheckCircle size={14} color="#34C759" />
              Accepted
            </span>
          )}
        </div>
      )}
    </div>
  );
};

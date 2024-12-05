import React from 'react';
import { Meeting } from '@/lib/types';
import ZoomVideo from "@/components/icons/ZoomVideo";
import SquareButton from "@/components/reusables/wrapper/squareButton";

interface MeetingCardProps {
  meeting: Meeting;
  onJoin: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onJoin }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="flex flex-row items-center gap-4">
        <ZoomVideo />
        <div className="flex flex-col">
          <h3 className={`text-lg font-semibold ${
            meeting.status === "Pending" || meeting.status === "Requested"
              ? "text-[#155EEF]"
              : "text-gray-800"
          }`}>
            {meeting.title}
          </h3>
          <p className="text-base font-normal text-gray-700">
            {meeting.meetingDescription}
          </p>
          <p className="text-base font-normal text-gray-700">
            {`${meeting.startTime} - ${meeting.endTime}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className={`text-base ${
          meeting.status === "Overdue" ? "text-[#FF3B30]" :
          meeting.status === "Attended" ? "text-[#34C759]" :
          "text-[#155EEF]"
        } font-normal`}>
          {meeting.status}
        </p>
        {(meeting.status === "Pending" || meeting.status === "Requested") && (
          <SquareButton 
            className="text-[#6A6A6A] px-0 py-0"
            onClick={onJoin}
          >
            Join
          </SquareButton>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
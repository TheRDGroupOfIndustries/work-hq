"use client";

import Container from "@/components/reusables/wrapper/Container";
import { createElement } from "react";

export interface MidInformationCardProps {
  title: string;
  icon: ({ height, width }: { height?: string; width?: string }) => JSX.Element;
  data: string | number;
  day?: string;
}

export default function MidInformationCard({
  midCardData,
  client = true,
}: {
  midCardData: MidInformationCardProps[];
  client?: boolean;
}) {
  if (midCardData && midCardData.length > 0) {
    return (
      <>
        <Container className="hidden md:block">
          <div className="w-full  h-[130px] flex flex-row items-center text-nowrap">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[0].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[0].icon)}
                </div>
                <div className=" font-semibold text-5xl">
                  {midCardData[0].data}
                </div>
              </div>
            </div>

            <div className="min-w-[10px]  rounded-full h-full bg-[#344054]"></div>

            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[1].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[1].icon)}
                </div>
                <div className=" font-semibold text-5xl">
                  {midCardData[1].data}
                </div>
              </div>
            </div>

            <div className="min-w-[10px] hidden lg:block rounded-full h-full bg-[#344054]"></div>

            <div className="w-full h-full hidden lg:flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[2].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[2].icon)}
                </div>
                {client ? (
                  <div className=" font-semibold text-lg flex flex-col">
                    {midCardData[2].data}
                    <span>{midCardData[2].day}</span>
                  </div>
                ) : (
                  <div className=" font-semibold text-5xl flex flex-col">
                    {midCardData[2].data}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>

        <Container className=" md:hidden ">
          <div className="w-full  h-[150px] flex flex-row items-center">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[0].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[0].icon)}
                </div>
                <div className=" font-semibold text-5xl flex flex-col">
                  {midCardData[0].data}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className=" md:hidden ">
          <div className="w-full  h-[150px] flex flex-row items-center">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[1].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[1].icon)}
                </div>
                <div className=" font-semibold text-5xl flex flex-col">
                  {midCardData[1].data}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className=" lg:hidden ">
          <div className="w-full  h-[150px] flex flex-row items-center">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
              <h4 className="text-lg uppercase font-semibold">
                {midCardData[2].title}
              </h4>
              <div className=" flex flex-row items-center justify-center gap-10">
                <div className="h-[65px] w-[65px] ">
                  {createElement(midCardData[2].icon)}
                </div>
                {client ? (
                  <div className=" font-semibold text-lg flex flex-col">
                    {midCardData[2].data}
                    <span>{midCardData[2].day}</span>
                  </div>
                ) : (
                  <div className=" font-semibold text-5xl flex flex-col">
                    {midCardData[2].data}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    // handle the case where midCardData is empty or undefined
    return <div>No data available</div>;
  }
}

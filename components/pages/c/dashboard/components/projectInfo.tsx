"use client";

import { useProjectContext } from "@/context/ProjectProvider";
import { Role, VENDOR } from "@/types";

export default function ProjectInfo({ role }: { role: Role }) {
  const { selectedProjectDetails } = useProjectContext();
  // console.log(selectedProjectDetails);

  const isLoading = !selectedProjectDetails;

  return (
    <div className={`w-full flex flex-col gap-4 mt-6 `}>
      <div
        className={`" w-full  rounded-[30px]  p-6 ${
          role === VENDOR
            ? "shadow-[10px_10px_20px_0px_#1c2c4766,-5px_-5px_15px_0px_#d8d8d8]"
            : "shadow-[10px_10px_20px_0px_#3B5F9766,-5px_-5px_15px_0px_#ffffff]"
        } "`}
      >
        <h2 className="text-lg font-semibold">ADDITONAL PROJECT INFO</h2>

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        ) : (
          <div className=" w-full h-full flex flex-col  md:flex-row p-2 ">
            <div className="pr-3 font-normal  md:w-1/2 h-full  flex flex-col gap-1 md:border-r md:border-b-0 border-b border-[#9c9c9c]">
              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Company Name</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.officialName}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Company Link</h2>
                <p className="text-base text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.companyLink}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Company Description</h2>
                <p className="text-base text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.about}
                </p>
              </div>
              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Company Logo</h2>
                <p className="text-base text-black bg-red-500">
                  Not valid position for company logo
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">
                  Company Working Locations
                </h2>
                <p className="text-base text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.workingLocations}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Company Contact No</h2>
                <p className="text-base text-[#6A6A6A]">
                  +91 {selectedProjectDetails?.companyDetails?.contactNo}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Company Address</h2>
                <p className="text-base text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.address}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Company Size</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.size}
                </p>
              </div>
            </div>
            <div className=" md:pl-6 font-normal md:w-1/2 h-full  flex flex-col gap-1 ">
              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Project Name</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.projectDetails?.projectName}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Project Category</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.projectDetails?.category}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">
                  What kind of project is this?
                </h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.projectDetails?.description}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Project SOW</h2>
                <p className="text-base  text-[#6A6A6A]">www.companylink.com</p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Expected Deadline</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.projectDetails?.deadline
                    ? new Date(
                        selectedProjectDetails?.projectDetails?.deadline
                      ).toLocaleDateString()
                    : "No deadline set"}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg text-[#344054]">Maintenance Needed</h2>
                <p className="text-base text-[#6A6A6A]">
                  {selectedProjectDetails?.projectDetails?.maintenanceNeeded
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">
                  Milestones wise Budeget
                </h2>
                <p className="text-base  text-[#6A6A6A]">
                  Milestone 1: 100,000 - 150,000
                </p>
                <p className="text-base  text-[#6A6A6A]">
                  Milestone 2: 50,000 - 100,000
                </p>
                <p className="text-base  text-[#6A6A6A]">
                  Milestone 3: 150,000 - 250,000
                </p>
              </div>

              <div className="w-full flex flex-col">
                <h2 className="text-lg  text-[#344054]">Company Size</h2>
                <p className="text-base  text-[#6A6A6A]">
                  {selectedProjectDetails?.companyDetails?.size} Employees
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import NewHeadline from "../reusables/components/NewHeadline";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types";
import Milestone from "./components/Milestone";
import Milestone1 from "./components/Milestone1";
import Milestone2 from "./components/Milestone2";
import Milestone3 from "./components/Milestone3";
import { toast } from "sonner";
import { useProjectContext } from "@/context/ProjectProvider";
import { useRouter } from "next/navigation";
export interface AddProjectFormData {
  projectDetails: {
    projectName: string;
    logo?: string;
    category: string;
    deadline: Date | undefined;
    additionalFiles: {
      url: string;
      title: string;
      description: string;
      date: Date;
      size: number;
    }[];
    maintenanceNeeded: boolean;
    description: string;
    scope: string;
    budget: [{ min: number; max: number }];
    hasVendor: boolean;
    vendorID?: string; // Ref to Users schema if hasVendor is true
  };
  companyDetails: {
    clientID: string; // Ref to Users schema
    officialName: string;
    logo?: string; // Optional
    about: string;
    workingLocations: string[];
    contactNo: string;
    address: string;
    companyLink?: string;
    size: string; // e.g., "100-200"
  };
  developmentDetails: {
    status: "completed" | "inProgress" | "pending" | "refactoring";
    deployment?: {
      link: string;
      channelID: string;
    };
    figma?: {
      link: string;
      channelID: string;
    };
    projectHours?: {
      date: Date;
      totalHours: number;
    }[]; // Derived from developers' hours
    teams: string[];
  };
}
function AddProject2() {
  const { data: session } = useSession();
  const [creating, setCreating] = useState(false);
  const user = session?.user as CustomUser;
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState<AddProjectFormData>({
    projectDetails: {
      projectName: "",
      logo: "",
      category: "",
      deadline: new Date(Date.now()),
      additionalFiles: [],
      maintenanceNeeded: false,
      description: "",
      scope: "",
      budget: [{ min: 0, max: 0 }], // Initialize budget as an object
      hasVendor: false,
      vendorID: undefined, // Optional
    },
    companyDetails: {
      clientID: user?._id, // Set clientID to session.user.id
      officialName: "",
      logo: "",
      about: "",
      workingLocations: [],
      contactNo: "",
      address: "",
      companyLink: "",
      size: "",
    },
    developmentDetails: {
      status: "pending",
      deployment: {
        link: "",
        channelID: "",
      },
      figma: {
        link: "",
        channelID: "",
      },
      projectHours: [],
      teams: [],
    },
  });

  const { setSelectedProject } = useProjectContext();
  const ButtonObjects = [
    {
      buttonText: "Cancel",
      onClick: () => router.push("/c/all-projects"),
      noIcon: true,
    },
  ];
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prevFormData: AddProjectFormData) => ({
      ...prevFormData,
      [section as keyof AddProjectFormData]: {
        ...prevFormData[section as keyof AddProjectFormData],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    // validateInfo();
    if (currentStep === 0) {
      if (
        formData.companyDetails.officialName === "" ||
        formData.companyDetails.about === "" ||
        formData.companyDetails.contactNo === "" ||
        formData.companyDetails.address === "" ||
        formData.companyDetails.size === "" ||
        formData.companyDetails.workingLocations.length === 0
      ) {
        return toast.error("Please fill all the required fields properly");
      }
      if (formData.companyDetails.contactNo.length !== 10) {
        return toast.error("Please enter a valid contact number");
      }
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 2)); // Move to the next step
    } else if (currentStep === 1) {
      if (
        formData.projectDetails.projectName === "" ||
        formData.projectDetails.category === "" ||
        formData.projectDetails.deadline === undefined ||
        formData.projectDetails.description === "" ||
        formData.projectDetails.scope === "" ||
        formData.projectDetails.budget[0].min === 0 ||
        formData.projectDetails.budget[0].max === 0
      ) {
        toast.error("Please fill all the required fields properly");
        return;
      }
      //for all the budgets check if the min is less than max
      let flag = false;
      formData.projectDetails.budget.forEach((budget) => {
        if (budget.min >= budget.max) {
          toast.error(
            "Please enter a valid budget range. Minimum should be less than Maximum"
          );
          flag = true;
          return;
        }
      });
      if (flag) return;
      else {
        console.log("Changed: ");
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 2)); // Move to the next step
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); // Move to the previous step
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(formData.projectDetails.deadline as Date);
    const finalFormData = formData;
    finalFormData.projectDetails.deadline = date;
    finalFormData.companyDetails.clientID = user?._id;

    console.log("date:", date);
    console.log("Final Form Data:", formData);
    try {
      setCreating(true);
      const response = await fetch("/api/project/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Project created successfully");
        setSelectedProject(data.project._id);
        router.push(`/c/all-projects`);
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <MainContainer role={ROLE}>
      <NewHeadline
        title="Add Project"
        subTitle="Overview / Add Project"
        buttonObjects={ButtonObjects}
      />
      <div className="flex flex-row gap-8  items-center justify-center">
        {/* Milestones indicators */}
        <Milestone
          num={1}
          title="Company Details"
          description="Let us know better about your company"
          isActiveNo={currentStep + 1}
        />
        <Milestone
          num={2}
          title="Project Details"
          description="What kind of project do u want us to build?"
          isActiveNo={currentStep + 1}
        />
        <Milestone
          num={3}
          title="Confirm Details"
          description="Let us confirm all the details provide by you till now."
          isActiveNo={currentStep + 1}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 p-4 pt-10 max-w-[1200px] w-full mx-auto"
      >
        {currentStep === 0 && (
          <Milestone1
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}

        {currentStep === 1 && (
          <Milestone2
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}

        {currentStep === 2 && (
          <Milestone3
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}

        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button disabled={creating} type="button" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {currentStep < 2 && (
            <Button disabled={creating} type="button" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === 2 && (
            <Button disabled={creating} type="submit">
              {creating ? "Creating..." : "Create Project"}
            </Button>
          )}
        </div>
      </form>
    </MainContainer>
  );
}

export default AddProject2;

"use client";
import React, { useState } from 'react';
import MainContainer from '@/components/reusables/wrapper/mainContainer';
import { ROLE } from '@/tempData';
import NewHeadline from '../reusables/components/NewHeadline';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { CustomUser } from '@/lib/types';
import Milestone from './components/Milestone';
import Milestone1 from './components/Milestone1';
import Milestone2 from './components/Milestone2';
import Milestone3 from './components/Milestone3';
import { toast } from 'sonner';
import { useProjectContext } from '@/context/ProjectProvider';
import { useRouter } from 'next/navigation';
export interface AddProjectFormData {
    projectDetails: {
      projectName: string;
      category: string;
      deadline: Date | undefined;
      additionalFiles: {
        url: string;
        title: string;
        description: string;
        date: string;
        size: number;
      }[];
      maintenanceNeeded: boolean;
      description: string;
      scope: string;
      budget: { min: number; max: number }[]; // Ensure budget is an object
      hasVendor: boolean;
      vendorID?: string | null; // Optional vendor ID
    };
    companyDetails: {
      clientID: string; // Set this to session.user.id
      officialName: string;
      logo?: string; // Optional
      about: string;
      workingLocations: string[];
      contactNo: string;
      address: string;
      companyLink?: string; // Optional
      size: string; // e.g., "100-200"
    };
  }
function AddProject2() {
    const { data: session } = useSession()
    const [creating, setCreating] = useState(false);
    const user = session?.user as CustomUser;
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();
    const [formData, setFormData] = useState<AddProjectFormData>({
        projectDetails: {
          projectName: "",
          category: "",
          deadline: undefined,
          additionalFiles: [],
          maintenanceNeeded: false,
          description: "",
          scope: "",
          budget: [{ min: 0, max: 0 }], // Initialize budget as an object
          hasVendor: false,
          vendorID: null, // Optional
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
      });
     
        const {setSelectedProject} = useProjectContext();
      const ButtonObjects = [
        {
            buttonText: 'Cancel',
            onClick: () => router.push('/c/all-projects'),
            noIcon: true,
        }]
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
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 2)); // Move to the next step
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); // Move to the previous step
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
     
        const date = new Date(formData.projectDetails.deadline as Date);
        let finalFormData = formData;
        finalFormData.projectDetails.deadline = date;
        finalFormData.companyDetails.clientID = user._id;

        console.log('date:', date);
        console.log('Final Form Data:', formData);
      try{
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
          router.push(`/c/project/something/dashboard`);
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
            <div className='flex flex-row gap-8  items-center justify-center'>
                {/* Milestones indicators */}
                <Milestone num={1} title="Company Details" description="Let us know better about your company" isActiveNo={currentStep+1} />
                <Milestone num={2} title="Project Details" description="What kind of project do u want us to build?" isActiveNo={currentStep+1} />
                <Milestone num={3} title="Confirm Details" description="Let us confirm all the details provide by you till now." isActiveNo={currentStep+1} />
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 p-4 pt-10 max-w-[1200px] w-full mx-auto">
                {currentStep === 0 && (
                  <Milestone1 formData={formData} handleChange={handleChange} setFormData={setFormData} />
                )}

                {currentStep === 1 && (
              <Milestone2 formData={formData} handleChange={handleChange} setFormData={setFormData} />
                )}

                {currentStep === 2 && (
                    <Milestone3 formData={formData} handleChange={handleChange} setFormData={setFormData} />
                )}

                <div className="flex justify-between">
                    {currentStep > 0 && (
                        <Button disabled={creating} type="button" onClick={handlePrevious}>
                            Previous
                        </Button>
                    )}
                    {currentStep < 2 ? (
                        <Button disabled={creating} type="button" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" disabled={creating}>{
                            creating ? 'Creating Project...' : 'Create Project' }
                          </Button>
                    )}
                </div>
            </form>
        </MainContainer>
    );
}

export default AddProject2;
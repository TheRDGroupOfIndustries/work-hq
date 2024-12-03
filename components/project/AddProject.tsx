"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CustomUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";

interface FormData {
  projectDetails: {
    projectName: string;
    category: string;
    deadline: string;
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
    budget: { min: number; max: number }; // Ensure budget is an object
    hasVendor: boolean;
    vendorID?: string | null; // Optional vendor ID
  };
  companyDetails: {
    clientID: string; // Set this to session.user.id
    officialName: string;
    logo?: string; // Optional
    about: string;
    workingLocations: string[];
    contactNo: string[];
    address: string;
    companyLink?: string; // Optional
    size: string; // e.g., "100-200"
  };
}

const AddProject = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const router = useRouter();
  const { setSelectedProject } = useProjectContext();
  const [formData, setFormData] = useState<FormData>({
    projectDetails: {
      projectName: "",
      category: "",
      deadline: "",
      additionalFiles: [],
      maintenanceNeeded: false,
      description: "",
      scope: "",
      budget: { min: 0, max: 0 }, // Initialize budget as an object
      hasVendor: false,
      vendorID: null, // Optional
    },
    companyDetails: {
      clientID: user?._id, // Set clientID to session.user.id
      officialName: "",
      logo: "",
      about: "",
      workingLocations: [],
      contactNo: [],
      address: "",
      companyLink: "",
      size: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [section as keyof FormData]: {
        ...prevFormData[section as keyof FormData],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formData.projectDetails.budget = {
        min: 0,
        max: 0,
      };
      formData.companyDetails.clientID = user._id;

      console.log("Form data", formData);
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-10 px-80">
      <h2 className="text-3xl">Add Project</h2>
      <label>
        Project Name<span className="text-red-500">*</span>
        <input
          type="text"
          name="projectDetails.projectName"
          value={formData.projectDetails.projectName}
          onChange={handleChange}
          placeholder="Project Name"
          required
        />
      </label>
      <label>
        Category<span className="text-red-500">*</span>
        <input
          type="text"
          name="projectDetails.category"
          value={formData.projectDetails.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
      </label>
      <label>
        Deadline<span className="text-red-500">*</span>
        <input
          type="date"
          name="projectDetails.deadline"
          value={formData.projectDetails.deadline}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Maintenance Needed
        <input
          type="checkbox"
          name="projectDetails.maintenanceNeeded"
          checked={formData.projectDetails.maintenanceNeeded}
          onChange={(e) =>
            setFormData({
              ...formData,
              projectDetails: {
                ...formData.projectDetails,
                maintenanceNeeded: e.target.checked,
              },
            })
          }
        />
      </label>
      <label>
        Description<span className="text-red-500">*</span>
        <textarea
          name="projectDetails.description"
          value={formData.projectDetails.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </label>
      <label>
        Scope<span className="text-red-500">*</span>
        <textarea
          name="projectDetails.scope"
          value={formData.projectDetails.scope}
          onChange={handleChange}
          placeholder="Scope"
          required
        />
      </label>
      <label>
        Budget Min<span className="text-red-500">*</span>
        <input
          type="number"
          name="projectDetails.budget.min"
          value={formData.projectDetails.budget.min}
          onChange={handleChange}
          placeholder="Budget Min"
          required
        />
      </label>
      <label>
        Budget Max<span className="text-red-500">*</span>
        <input
          type="number"
          name="projectDetails.budget.max"
          value={formData.projectDetails.budget.max}
          onChange={handleChange}
          placeholder="Budget Max"
          required
        />
      </label>
      <label>
        Has Vendor
        <input
          type="checkbox"
          name="projectDetails.hasVendor"
          checked={formData.projectDetails.hasVendor}
          onChange={(e) =>
            setFormData({
              ...formData,
              projectDetails: {
                ...formData.projectDetails,
                hasVendor: e.target.checked,
              },
            })
          }
        />
      </label>
      <label>
        Official Name<span className="text-red-500">*</span>
        <input
          type="text"
          name="companyDetails.officialName"
          value={formData.companyDetails.officialName}
          onChange={handleChange}
          placeholder="Official Name"
          required
        />
      </label>
      <label>
        Logo
        <input
          type="text"
          name="companyDetails.logo"
          value={formData.companyDetails.logo}
          onChange={handleChange}
          placeholder="Logo"
        />
      </label>
      <label>
        About<span className="text-red-500">*</span>
        <textarea
          name="companyDetails.about"
          value={formData.companyDetails.about}
          onChange={handleChange}
          placeholder="About"
          required
        />
      </label>
      <label>
        Working Locations (comma-separated)
        <span className="text-red-500">*</span>
        <input
          type="text"
          name="companyDetails.workingLocations"
          value={formData.companyDetails.workingLocations.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              companyDetails: {
                ...formData.companyDetails,
                workingLocations: e.target.value
                  .split(",")
                  .map((loc) => loc.trim()),
              },
            })
          }
          placeholder="Working Locations (comma-separated)"
          required
        />
      </label>
      <label>
        Contact Numbers (comma-separated)<span className="text-red-500">*</span>
        <input
          type="text"
          name="companyDetails.contactNo"
          value={formData.companyDetails.contactNo.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              companyDetails: {
                ...formData.companyDetails,
                contactNo: e.target.value.split(",").map((num) => num.trim()),
              },
            })
          }
          placeholder="Contact Numbers (comma-separated)"
          required
        />
      </label>
      <label>
        Address<span className="text-red-500">*</span>
        <textarea
          name="companyDetails.address"
          value={formData.companyDetails.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
      </label>
      <label>
        Company Link
        <input
          type="text"
          name="companyDetails.companyLink"
          value={formData.companyDetails.companyLink}
          onChange={handleChange}
          placeholder="Company Link"
        />
      </label>
      <label>
        Company Size<span className="text-red-500">*</span>
        <input
          type="text"
          name="companyDetails.size"
          value={formData.companyDetails.size}
          onChange={handleChange}
          placeholder="Company Size"
          required
        />
      </label>
      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default AddProject;

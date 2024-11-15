"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CustomUser } from "@/lib/types";

const AddProject = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  // console.log(session);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: "",
    start_date: "",
    end_date: "",
    technologies: [],
    milestones: [{ title: "", due_date: "", budget: 0, completed: false }],
    files: [],
    project_ref: [],
    notes: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "technologies" ||
        name === "files" ||
        name === "project_ref" ||
        name === "notes"
          ? value.split(",").map((tech) => tech)
          : value,
    });
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        { title: "", due_date: "", budget: 0, completed: false },
      ],
    });
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedMilestones = formData.milestones.map((milestone, i) =>
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setFormData({ ...formData, milestones: updatedMilestones });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    const client = user.role === "client" ? user._id : null;
    const vendor = user.role === "vendor" ? user._id : null;
    try {
      const response = await fetch("/api/projects/create", {
        method: "POST",
        body: JSON.stringify({ ...formData, client, vendor }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success("Project created successfully");
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-10 px-80">
      <h2 className="text-3xl">Add Project</h2>
      <label>
        Project Title<span className="text-red-500">*</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />
      </label>
      <label>
        Project Description<span className="text-red-500">*</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
        />
      </label>
      <label>
        Project Logo
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Project Logo"
        />
      </label>
      <label>
        Start Date<span className="text-red-500">*</span>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End Date<span className="text-red-500">*</span>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </label>
      <label>
        Technologies (comma-separated)<span className="text-red-500">*</span>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Technologies (comma-separated)"
        />
      </label>
      {formData.milestones.map((milestone, index) => (
        <div key={index}>
          <label>
            Milestone Title <span className="text-red-500">*</span>
            <input
              type="text"
              value={milestone.title}
              onChange={(e) =>
                handleMilestoneChange(index, "title", e.target.value)
              }
              placeholder="Milestone Title"
              required
            />
          </label>
          <label>
            Due Date <span className="text-red-500">*</span>
            <input
              type="date"
              value={milestone.due_date}
              onChange={(e) =>
                handleMilestoneChange(index, "due_date", e.target.value)
              }
              required
            />
          </label>
          <br />
          <label>
            Budget <span className="text-red-500">*</span>
            <input
              type="number"
              value={milestone.budget}
              onChange={(e) =>
                handleMilestoneChange(index, "budget", e.target.value)
              }
              placeholder="Budget"
            />
          </label>
          {/* <label>
            Completed
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={(e) =>
                handleMilestoneChange(index, "completed", e.target.checked)
              }
            />
          </label> */}
        </div>
      ))}
      <button type="button" onClick={addMilestone}>
        Add Milestone
      </button>
      <label>
        Files (comma-separated URLs/IDs)
        <input
          type="text"
          name="files"
          value={formData.files}
          onChange={handleChange}
          placeholder="Files (comma-separated URLs/IDs)"
        />
      </label>
      <label>
        Project References (comma-separated)
        <textarea
          name="project_ref"
          value={formData.project_ref}
          onChange={handleChange}
          placeholder="Project References (comma-separated)"
        />
      </label>
      <label>
        Notes (comma-separated)
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes (comma-separated)"
        />
      </label>
      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default AddProject;

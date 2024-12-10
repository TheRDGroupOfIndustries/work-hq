"use client";
import Filter from "@/components/icons/Filter";
import Headline from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import Container from "@/components/reusables/wrapper/Container";
import { Button } from "@/components/ui/button";
import { ROLE } from "@/tempData";
import { motion } from "framer-motion";
import { ChartLine, Ellipsis } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Define possible task statuses
export type TaskStatus = "todo" | "in-progress" | "completed" | "refactoring";

// Interface for individual task details
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: {
    avatar: string;
    name: string;
  };
}

// Interface for kanban board columns
export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

// Initial data for kanban board columns
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Create the Navigation",
        description:
          "This is another task such as creating navigation or writing category",
        status: "todo",
        assignee: {
          avatar: "/placeholder.svg?height=32&width=32",
          name: "User 1",
        },
      },
      {
        id: "2",
        title: "Design User Interface",
        description: "Create wireframes and mockups for the main pages",
        status: "todo",
        assignee: {
          avatar: "/placeholder.svg?height=32&width=32",
          name: "User 2",
        },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Implement Authentication",
        description: "Set up user registration and login functionality",
        status: "in-progress",
        assignee: {
          avatar: "/placeholder.svg?height=32&width=32",
          name: "User 3",
        },
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: "4",
        title: "Set Up Project Structure",
        description: "Initialize the Next.js project and set up basic routing",
        status: "completed",
        assignee: {
          avatar: "/placeholder.svg?height=32&width=32",
          name: "User 4",
        },
      },
    ],
  },
  {
    id: "refactoring",
    title: "Refactoring",
    tasks: [],
  },
];

export default function Kanban() {
  // State for search input
  const [search, setSearch] = useState("");

  // Headline action buttons configuration
  const headLineButtons = [
    {
      buttonText: "Export All Tasks",
      onNeedIcon: true,
      onClick: () => console.log("Export Report"),
    },
  ];

  // State management for kanban board columns
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // State to track the currently dragged task
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  // State to track the source column of the dragged task
  const [draggingColumnId, setDraggingColumnId] = useState<TaskStatus | null>(
    null
  );

  // Ref to store the entire dragged task object
  const draggedTask = useRef<Task | null>(null);

  // Handler for when drag operation starts
  const onDragStart = (task: Task, columnId: TaskStatus) => {
    // Set the current dragging task's ID and column
    setDraggingTaskId(task.id);
    setDraggingColumnId(columnId);
    // Store the entire task object in the ref
    draggedTask.current = task;
  };

  // Handler for when a task is dragged over a different column
  const onDragOver = (columnId: TaskStatus) => {
    // Prevent unnecessary updates if dragging within the same column
    if (draggingColumnId === columnId) return;

    // Update columns state to move the task
    setColumns((prevColumns) => {
      // Create a deep copy of columns to avoid direct mutation
      const newColumns = prevColumns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));

      // Find source and destination columns
      const sourceColumn = newColumns.find(
        (col) => col.id === draggingColumnId
      );
      const destColumn = newColumns.find((col) => col.id === columnId);

      // Perform task transfer between columns
      if (sourceColumn && destColumn && draggedTask.current) {
        const taskIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === draggingTaskId
        );
        if (taskIndex !== -1) {
          // Remove task from source column
          const [task] = sourceColumn.tasks.splice(taskIndex, 1);
          // Add task to destination column with updated status
          destColumn.tasks.push({ ...task, status: columnId });
          // Update dragging column ID
          setDraggingColumnId(columnId);
        }
      }

      return newColumns;
    });
  };

  // Handler for when drag operation ends
  const onDragEnd = () => {
    // Reset all dragging-related states
    setDraggingTaskId(null);
    setDraggingColumnId(null);
    draggedTask.current = null;
  };

  return (
    <MainContainer role={ROLE}>
      {/* Page header with title and action buttons */}
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      {/* Search and filter controls */}
      <div className="flex flex-wrap gap-4">
        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />

        {/* Filter dropdown */}
        <Select>
          <SelectTrigger className="w-fit te outline-none gap-1 bg-transparent">
            <div className="w-full text-[#697077] flex flex-row gap-1 items-center justify-end">
              <Filter />
              Filter
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>

        {/* Insights dropdown */}
        <Select>
          <SelectTrigger className="w-fit te outline-none gap-1 bg-transparent">
            <div className="w-full text-[#697077] flex flex-row gap-1 items-center justify-end">
              <ChartLine />
              Insights
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>

        {/* User avatars section */}
        <div className="flex -space-x-2 ml-auto">
          {/* Render user avatars */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Image
              key={i}
              src={`/assets/user.png`}
              alt={`User ${i + 1}`}
              className="rounded-full size-12 border-2 border-background"
              width={32}
              height={32}
            />
          ))}
          {/* Additional users button */}
          <Button
            size="icon"
            variant="outline"
            className="rounded-full size-12 border-2 border-background"
          >
            +3
          </Button>
        </div>
      </div>

      {/* Kanban board columns */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {columns.map((column) => (
          <motion.div
            key={column.id}
            layout
            className="space-y-4"
            onDragOver={(e) => {
              e.preventDefault();
              onDragOver(column.id);
            }}
          >
            <Container>
              {/* Column header with title and task count */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{column.title}</h2>
                <span className="rounded-full bg-muted px-2 py-1 text-sm">
                  {column.tasks.length.toString().padStart(2, "0")}
                </span>
              </div>
              {/* Tasks within the column */}
              <motion.div layout className="min-h-[500px]">
                {column.tasks.map((task, index) => (
                  <TaskCard
                    index={index}
                    key={task.id}
                    task={task}
                    onDragStart={() => onDragStart(task, column.id)}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </motion.div>
            </Container>
          </motion.div>
        ))}
      </motion.div>
    </MainContainer>
  );
}

// Props interface for TaskCard component
interface TaskCardProps {
  task: Task;
  index: number;
  onDragStart: () => void;
  onDragEnd: () => void;
}

// Individual task card component
function TaskCard({ task, onDragStart, onDragEnd, index }: TaskCardProps) {
  return (
    <motion.div
      layout
      layoutId={task.id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="mb-4 cursor-grab active:cursor-grabbing"
    >
      <Container>
        {/* TODO: Add task card content */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="">
              <Image
                src={
                   "/assets/user.png"
                }
                alt="Profile Image"
                width="20"
                height="20"
                className="w-8 h-8 rounded-full object-cover overflow-hidden"
              />
            </div>
            <Ellipsis color='var(--light-gray)'/>
          </div>
          <p className="text-sm text-light-gray">{task.title}</p>
          <span>{`Task - ${index + 1}`}</span>
        </div>
      </Container>
    </motion.div>
  );
}

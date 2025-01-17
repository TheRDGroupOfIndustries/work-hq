"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { TaskValues } from "@/lib/types";
import { ROLE } from "@/tempData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Filter from "@/components/icons/Filter";
import Headline from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import Container from "@/components/reusables/wrapper/Container";
import { ChartLine, Ellipsis } from "lucide-react";

export type TaskStatus = "pending" | "inProgress" | "completed" | "refactoring";
export interface Column {
  id: TaskStatus;
  title: string;
  tasks: TaskValues[];
}



export default function Kanban() {
  const [search, setSearch] = useState("");

  // const { selectedProjectTasks } = useProjectContext();

  const router = useRouter();

  // Headline action buttons configuration
  const headLineButtons = [
    {
      buttonText: "Export All Tasks",
      onNeedIcon: true,
      onClick: () => console.log("Export Report"),
    },
  ];

  // State management for kanban board columns
  const [columns, setColumns] = useState<Column[]>([]);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingColumnId, setDraggingColumnId] = useState<TaskStatus | null>(
    null
  );
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const draggedTask = useRef<TaskValues | null>(null);
  const [hoveredColumnId, setHoveredColumnId] = useState<TaskStatus | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const onDragStart = (task: TaskValues, columnId: TaskStatus) => {
    setDraggingTaskId(task.taskNo.toString());
    setDraggingColumnId(columnId);
    draggedTask.current = task;
  };

  const onDragOver = (
    columnId: TaskStatus,
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setDropIndex(index);
    setHoveredColumnId(columnId);
    setHoveredIndex(index);
  };

  const resetHoverStates = () => {
    setHoveredColumnId(null);
    setHoveredIndex(null);
  };

  const onDragEnd = async (
    columnId: TaskStatus,
    draggedTaskValues: TaskValues
  ) => {
    try {
      const response = await fetch(
        `/api/task/update/${draggedTaskValues._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...draggedTaskValues,
            status: columnId,
          }),
        }
      );

      if (response.status === 200) {
        setColumns((prevColumns) => {
          const newColumns = prevColumns?.map((col) => ({
            ...col,
            tasks: [...col.tasks],
          }));

          const sourceColumn = newColumns.find(
            (col) => col.id === draggingColumnId
          );

          if (sourceColumn && draggedTask.current !== null) {
            const taskIndex = sourceColumn.tasks.findIndex(
              (task) => task.taskNo.toString() === draggingTaskId
            );

            if (taskIndex !== -1) {
              const [task] = sourceColumn.tasks.splice(taskIndex, 1);

              const destColumn = newColumns.find((col) => col.id === columnId);
              if (destColumn) {
                const insertIndex =
                  dropIndex !== null ? dropIndex : destColumn.tasks.length;
                destColumn.tasks.splice(insertIndex, 0, {
                  ...task,
                  status: columnId,
                });

                toast.success(
                  `Task - ${draggedTaskValues.issueSubject} moved successfully to ${columnId} column`
                );
              }
            }
          }

          return newColumns;
        });

        // Reset all dragging-related and hover states
        setDraggingTaskId(null);
        setDraggingColumnId(null);
        draggedTask.current = null;
        setDropIndex(null);
        resetHoverStates();
      } else {
        toast.error("Failed to update task in the database");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task in the database");
    }
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
        {/* Insights dropdown */}assignee assignee assignee assignee assignee
        assignee assignee
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
        <div
          onClick={() => {
            router.push("/dev/project/need-to-add-project/team-members");
          }}
          className="flex -space-x-2 ml-auto"
        >
          {/* Render user avatars */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Image
              key={i}
              src={`/assets/user.png`}
              alt={`User ${i + 1}`}
              className="cursor-pointer rounded-full size-12 border-2 border-background"
              width={32}
              height={32}
            />
          ))}
          {/* Additional users button */}
          <Button
            size="icon"
            variant="outline"
            className="cursor-pointer rounded-full size-12 border-2 border-background"
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
            className={`space-y-4 ${
              hoveredColumnId === column.id ? "bg-gray-100" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              onDragOver(column.id, e, 0);
            }}
            onDrop={() => {
              if (draggedTask.current) {
                onDragEnd(column.id, draggedTask.current);
              }
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
                    key={task.taskNo}
                    task={task}
                    onDragStart={() => onDragStart(task, column.id)}
                    onDragEnd={() => onDragEnd(column.id, task)}
                    onDragOver={(e) => onDragOver(column.id, e, index)}
                    isHovered={
                      hoveredColumnId === column.id && hoveredIndex === index
                    }
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

interface TaskCardProps {
  task: TaskValues;
  index: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isHovered: boolean;
}

function TaskCard({
  task,
  onDragStart,
  onDragEnd,
  onDragOver,
  index,
  isHovered,
}: TaskCardProps) {
  return (
    <motion.div
      layout
      layoutId={task.taskNo.toString()}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={`mb-4 cursor-grab active:cursor-grabbing ${
        isHovered ? "border border-blue-500 rounded-lg z-50" : ""
      }`}
    >
      <Container>
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex-center gap-1">
              <Image
                src={task?.assignedTo?.avatar || "/assets/user.png"}
                alt="Profile Image"
                width="20"
                height="20"
                className="w-8 h-8 rounded-full object-cover overflow-hidden"
              />
              <span className="text-sm">{task.assignedTo?.name}</span>
            </div>
            <Ellipsis color="var(--light-gray)" />
          </div>
          <p className="text-sm text-light-gray">{task.issueSubject}</p>
          <span>{`Task - ${index + 1}`}</span>
          <p className="text-xs text-end">
            Priority:{" "}
            <span
              className={`capitalize text-xs px-1 py-0.5 rounded-sm ${
                task.priority === "low"
                  ? "bg-green-500"
                  : task.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-xs text-end mt-1">
            Due: {task.dueDate.toLocaleDateString()}
          </p>
        </div>
      </Container>
    </motion.div>
  );
}

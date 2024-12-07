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

import { ROLE } from "@/tempData";
import { motion } from "framer-motion";
import { ChartLine } from "lucide-react";
import { useRef, useState } from "react";

import Image from "next/image";

import Container from "@/components/reusables/wrapper/Container";
import { Button } from "@/components/ui/button";


export type TaskStatus = "todo" | "in-progress" | "completed" | "refactoring";

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

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

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
  const [search, setSearch] = useState("");
  const headLineButtons = [
    {
      buttonText: "Export All Tasks",
      onNeedIcon: true,
      onClick: () => console.log("Export Report"),
    },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingColumnId, setDraggingColumnId] = useState<TaskStatus | null>(
    null
  );
  const draggedTask = useRef<Task | null>(null);

  const onDragStart = (task: Task, columnId: TaskStatus) => {
    setDraggingTaskId(task.id);
    setDraggingColumnId(columnId);
    draggedTask.current = task;
  };

  const onDragOver = (columnId: TaskStatus) => {
    if (draggingColumnId === columnId) return;

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));
      const sourceColumn = newColumns.find(
        (col) => col.id === draggingColumnId
      );
      const destColumn = newColumns.find((col) => col.id === columnId);

      if (sourceColumn && destColumn && draggedTask.current) {
        const taskIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === draggingTaskId
        );
        if (taskIndex !== -1) {
          const [task] = sourceColumn.tasks.splice(taskIndex, 1);
          destColumn.tasks.push({ ...task, status: columnId });
          setDraggingColumnId(columnId);
        }
      }

      return newColumns;
    });
  };

  const onDragEnd = () => {
    setDraggingTaskId(null);
    setDraggingColumnId(null);
    draggedTask.current = null;
  };
  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />
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

        <div className="flex -space-x-2 ml-auto">
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
          <Button
            size="icon"
            variant="outline"
            className="rounded-full size-12 border-2 border-background"
          >
            +3
          </Button>
        </div>
      </div>

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
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{column.title}</h2>
                <span className="rounded-full bg-muted px-2 py-1 text-sm">
                  {column.tasks.length.toString().padStart(2, "0")}
                </span>
              </div>
              <motion.div
                layout
                className="min-h-[500px]"
              >
                {column.tasks.map((task) => (
                  <TaskCard
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

interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
  onDragEnd: () => void;
}
function TaskCard({ task, onDragStart, onDragEnd }: TaskCardProps) {
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
        <div></div>
      </Container>
    </motion.div>
  );
}

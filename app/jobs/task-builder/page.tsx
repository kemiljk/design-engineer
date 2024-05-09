import React from "react";
import TaskBuilder from "./task-builder";
import { getTaskBuilderSuggestions } from "@/lib/cosmic";

async function TaskBuilderPage() {
  const suggestions = await getTaskBuilderSuggestions();

  return <TaskBuilder suggestions={suggestions} />;
}

export default TaskBuilderPage;

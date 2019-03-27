import React, { useContext } from "react";
import { AddTaskContext } from "../contexts/AddTask";
export default function() {
  const { taskRepair } = useContext(AddTaskContext);
  return (
    <div className="">
      <button
        className="btn btn-primary float-left"
        onClick={() => {
          taskRepair({ name: "Add tasks" });
        }}
      >
        <i class="fas fa-plus mr-2" />
        Add Tasks
      </button>
    </div>
  );
}

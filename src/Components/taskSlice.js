/* eslint-disable */

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(
    "https://api.jsonbin.io/v3/b/65da4fd5dc74654018a959af",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$ObOWCtrvxW1SANQAasPTMucUk56shLzQoXMu6Sc3wja/w1pp4raVm",
      },
    }
  );
  const data = await response.json();
  console.log(data); // Log the data before returning it
  return data.record; // Assuming the tasks are stored directly in the bin
  // Assuming the tasks are stored directly in the bin
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { dispatch }) => {
    const data = await response.json();
    let tasks = data.record.tasks || [];
    // Assuming tasks are directly fetched. Ensure this aligns with your bin structure
    const newId = tasks.reduce((max, item) => Math.max(max, item?.id ?? 0), 0) + 1;
    const newTask = { ...task, id: newId };
    tasks.push(newTask);

    const response = await fetch(
      "https://api.jsonbin.io/v3/b/65da4fd5dc74654018a959af",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$ObOWCtrvxW1SANQAasPTMucUk56shLzQoXMu6Sc3wja/w1pp4raVm",
        },
        body: JSON.stringify({ tasks }), // Ensure this structure matches your bin's
      }
    );

    

    if (!response.ok) {
      throw new Error('Failed to update tasks');
    }

    const updatedData = await response.json();
    console.log(updatedData); // For debugging
    return newTask;
  }
);


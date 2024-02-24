// App.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog, updateForm} from "./formSlice";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const FormDialog = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const { isOpen, form } = useSelector((state) => state.form);


  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateForm({ ...form, [name]: value }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/65da573c266cfc3fde8ed7b9",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$ObOWCtrvxW1SANQAasPTMucUk56shLzQoXMu6Sc3wja/w1pp4raVm",
            },
          }
        );
        setTasks(response.data.record.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [isOpen]);

  const handleSubmit = async () => {
    const binId = "65da573c266cfc3fde8ed7b9"; // Your existing bin ID
    const url = `https://api.jsonbin.io/v3/b/${binId}`;

    try {
      // Step 1: Fetch the current data from the bin
      const currentDataResponse = await axios.get(url, {
        headers: {
          "X-Master-Key":
            "$2a$10$ObOWCtrvxW1SANQAasPTMucUk56shLzQoXMu6Sc3wja/w1pp4raVm",
        },
      });

      let currentData = currentDataResponse.data.record;

      // Determine the next ID
      let maxId = currentData.tasks.reduce(
        (max, task) => (task.id > max ? task.id : max),
        0
      ); // Find the highest ID
      const nextId = maxId + 1; // Increment by 1 for the new entry

      // Step 2: Update the data locally
      const updatedTasks = [
        ...currentData.tasks,
        { id: nextId, name: form.name, describe: form.describe },
      ];

      // Step 3: Send the updated data back to the bin
      const updatedData = { tasks: updatedTasks };
      const updateResponse = await axios.put(url, updatedData, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            "$2a$10$ObOWCtrvxW1SANQAasPTMucUk56shLzQoXMu6Sc3wja/w1pp4raVm",
          "X-Bin-Versioning": "false", // Use true if you want to keep versions
        },
      });

      console.log(updateResponse.data);
      dispatch(closeDialog());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        sx={{ margin: "1rem" }}
        onClick={() => dispatch(openDialog())}
      >
        Додати завдання
      </Button>
      <DataGrid
              rows={tasks}
              columns={[
                { field: 'id', headerName: '№', width: 90 },
                { field: 'name', headerName: 'Name', width: 150 },
                { 
                  field: 'describe', 
                  headerName: 'Describe', 
                  width: 300, 
                  renderCell: (param) => (
                    <div style={{ whiteSpace: 'pre-wrap'}}>
                      {param.row ? param.row.describe : ''}
                    </div>
                  ),
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowHeight={(params) => Math.max(100, (params.row && params.row.describe) ? params.row.describe.split('\n').length * 20 : 0)}
            />
      <Dialog open={isOpen} onClose={() => dispatch(closeDialog())}>
        <DialogTitle>Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Назва завдання"
            type="text"
            fullWidth
            variant="standard"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="describe"
            label="Короткий опис завдання"
            type="text"
            fullWidth
            variant="standard"
            value={form.describe}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(closeDialog())}>ОТМЄНАААА</Button>
          <Button onClick={handleSubmit}>Відправити</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormDialog;

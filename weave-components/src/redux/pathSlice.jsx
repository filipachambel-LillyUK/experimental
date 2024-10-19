import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    paths: [],  // Initialize with an empty array for paths
    activePath: '/'  // Default to the homepage
  };
  
  const pathSlice = createSlice({
    name: "path",
    initialState,
    reducers: {
      addPaths: (state, action) => {
        console.log(action.payload)
        state.paths.push(action.payload);
        
      },
      resetPaths: (state) => {
        state.paths = []; 
      },
      setActivePath: (state, action) => {
        state.activePath = action.payload; 
      }
    },
  });
  
  

export const { addPaths, setActivePath, resetPaths } = pathSlice.actions;
export default pathSlice.reducer;

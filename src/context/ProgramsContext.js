import React, { createContext, useReducer } from "react";
import ProgramsReducer from "../reducers/ProgramsReducer";
import ProgramsService from "../services/ProgramsService";
import { PROGRAMS_RECIBIDOS, SINGLE_PROGRAM_RECIBIDO } from "../types";

const initialState = {
  programs: null,
  program: null,
};

export const ProgramsContext = createContext(initialState);

export const ProgramsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProgramsReducer, initialState);

  const getPrograms = () => {
    ProgramsService.getPrograms().then((res) => {
      const { programs } = res.data;
      dispatch({ type: PROGRAMS_RECIBIDOS, payload: programs });
    });
  };

  const getSingleProgram = (program_id) => {
    ProgramsService.getSingleProgram(program_id).then((res) => {
      const { program } = res.data;
      dispatch({ type: SINGLE_PROGRAM_RECIBIDO, payload: program });
    });
  };

  return (
    <ProgramsContext.Provider
      value={{ ...state, getPrograms, getSingleProgram }}
    >
      {children}
    </ProgramsContext.Provider>
  );
};

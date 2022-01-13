import { PROGRAMS_RECIBIDOS, SINGLE_PROGRAM_RECIBIDO } from "../types";

const ProgramsReducer = (state, { type, payload }) => {
  switch (type) {
    case PROGRAMS_RECIBIDOS:
      return { ...state, programs: payload };
    case SINGLE_PROGRAM_RECIBIDO:
      return { ...state, program: payload };
    default:
      return { ...state };
  }
};
export default ProgramsReducer;

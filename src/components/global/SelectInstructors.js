import React, { useState } from "react";

const SelectInstructors = ({
  instructors,
  selected,
  addInstructor,
  removeInstructor,
}) => {
  const [query, setQuery] = useState("");

  const renderInstructors = () => {
    if (Array.isArray(instructors) && query !== "") {
      let instructorsRender = [...instructors];
      if (query !== "") {
        instructorsRender = instructorsRender.filter(
          (instructor) =>
            String(instructor.name)
              .toLowerCase()
              .startsWith(String(query).toLowerCase()) ||
            String(instructor.last_name)
              .toLowerCase()
              .startsWith(String(query).toLowerCase())
        );
      }
      if (Array.isArray(selected)) {
        const current = selected.map(
          ({ instructor }) => instructor.instructor_id
        );
        instructorsRender = instructorsRender.filter(
          (instructor) => !current.includes(instructor.instructor_id)
        );
      }
      return instructorsRender
        .slice(0, 3)
        .map((instructor) => (
          <li
            key={instructor.instructor_id}
            className="dropdown-item border"
            onClick={() => addInstructor(instructor)}
          >
            {instructor.name} {instructor.last_name}
          </li>
        ))
        .concat(
          <li
            key="nuevo"
            className="dropdown-item border pointer"
            onClick={() => {
              addInstructor({ instructor_id: "nuevo", name: query });
              setQuery("");
            }}
          >
            + Crear instructor "{query}"
          </li>
        );
    }
  };

  const renderSelected = () => {
    if (Array.isArray(selected)) {
      return selected.map(({ instructor }) => (
        <span className="badge badge-pill bg-light border text-dark p-2 me-1">
          {instructor.name} {instructor.last_name}{" "}
          <i
            className="fa fa-times small ms-1 pointer"
            onClick={() => removeInstructor(instructor.instructor_id)}
          ></i>
        </span>
      ));
    }
  };

  return (
    <div className="mb-3">
      <label>Instructor(es)</label>
      <input
        type="text"
        value={query}
        className="form-control"
        placeholder="Buscar por nombre"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>{renderInstructors()}</div>
      <div className="py-2">{renderSelected()}</div>
    </div>
  );
};

export default SelectInstructors;

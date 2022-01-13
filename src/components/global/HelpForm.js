import React, { useState } from "react";

const HelpForm = ({ submit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Podemos resolver cualquier duda que tengas</p>
        <textarea
          rows="4"
          value={text}
          className="form-control mb-3"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default HelpForm;

import React from "react";
import "./App.css";
import Project from "./project";

const App: React.FC = () => {
  return (
    <div className="pa4">
      <div className="overflow-auto">
        <Project />
      </div>
    </div>
  );
};

export default App;

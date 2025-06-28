import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/Routes";

const AppRoutes: React.FC = () => {
  const routing = useRoutes(appRoutes);
  return <>{routing}</>;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

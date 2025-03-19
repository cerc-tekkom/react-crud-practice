import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreateActivityPage from "./pages/CreateActivityPage";
import UpdateActivityPage from "./pages/UpdateActivityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UpdateActivityPage />} />
        <Route path="/create" element={<CreateActivityPage />} />
      </Routes>
    </Router>
  );
}

export default App;

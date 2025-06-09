import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apply from "./pages/Apply";
import ViewApplications from "./pages/ViewApplications";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Apply />} />
        <Route path="/applications" element={<ViewApplications />} />
      </Routes>
    </Router>
  );
}

export default App;

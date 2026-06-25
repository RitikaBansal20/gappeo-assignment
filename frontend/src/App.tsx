import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateMatch from "./pages/CandidateMatch";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import CreateJob from "./pages/CreateJob";
import CreateCandidate from "./pages/CreateCandidate";
import EditJob from "./pages/EditJob";
import EditCandidate from "./pages/EditCandidate";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
  <Routes>

    <Route path="/login" element={<Login />} />

  <Route path="/login" element={<Login />} />

<Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/candidates"
  element={
    <ProtectedRoute>
      <Candidates />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-job"
  element={
    <ProtectedRoute>
      <CreateJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-candidate"
  element={
    <ProtectedRoute>
      <CreateCandidate />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-candidate/:id"
  element={
    <ProtectedRoute>
      <EditCandidate />
    </ProtectedRoute>
  }
/>

<Route
  path="/candidate-match/:id"
  element={
    <ProtectedRoute>
      <CandidateMatch />
    </ProtectedRoute>
  }
/>

  </Routes>
</BrowserRouter>
  );
}

export default App;
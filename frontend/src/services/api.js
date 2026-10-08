// const API_URL = "http://127.0.0.1:8000";

// export async function registerUser(userData) {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.detail || "Registration failed");
//   }

//   return data;
// }

// export async function loginUser(userData) {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.detail || "Login failed");
//   }

//   return data;
// }

// export async function getCurrentUser() {
//   const token = localStorage.getItem("access_token");

//   const response = await fetch(`${API_URL}/auth/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.detail || "Authentication failed");
//   }

//   return data;
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={<Navigate to="/register" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
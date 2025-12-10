import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Home from "./components/home/Page";
import Header from "./components/header/Header";
import About from "./components/about/Page";
import Login from "./components/login/Page";
import Signup from "./components/signup/Page";

function App() {
  const [employee, setEmployee] = useState({});
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("list")) || [];
    setList(saved);
    setFiltered(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    setIsAuth(auth);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validateForm = () => {
    let errs = {};

    if (!employee.ename?.trim()) errs.ename = "Employee Name is required";
    if (!employee.email?.trim()) errs.email = "Employee Email is required";
    if (!employee.department?.trim()) errs.department = "Department is required";
    if (!employee.salary?.toString().trim()) errs.salary = "Salary is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!editId) {
      const newRecord = { ...employee, id: Date.now() };
      const updated = [...list, newRecord];
      setList(updated);
      setFiltered(updated);
    } else {
      const updated = list.map((item) =>
        item.id === editId ? { ...item, ...employee } : item
      );
      setList(updated);
      setFiltered(updated);
      navigate("/about");
    }

    setEmployee({});
    setEditId(null);
  };

  const handleDelete = (id) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    setFiltered(updated);
  };

  const handleEdit = (id) => {
    const record = list.find((item) => item.id === id);
    setEmployee(record);
    setEditId(id);
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value.trim()) return setFiltered(list);

    const filteredList = list.filter((item) =>
      item.ename.toLowerCase().includes(value)
    );
    setFiltered(filteredList);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    setIsAuth(false);
    navigate("/");
  };

  if (isAuth) {
    return (
      <>
        <Header logout={handleLogout} handleSearch={handleSearch} />

        <Routes>
          <Route
            index
            element={
              <Home
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                employee={employee}
                editId={editId}
                errors={errors}
              />
            }
          />

          <Route
            path="/about"
            element={
              <About
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                list={list}
                newList={filtered}
              />
            }
          />

          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login setIsAuth={setIsAuth} navigate={navigate} />} />
      <Route path="/signup" element={<Signup navigate={navigate} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

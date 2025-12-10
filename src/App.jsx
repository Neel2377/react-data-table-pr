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
  const [editId, setEditId] = useState(null);
  const [mount, setMount] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState({});
  const [newList, setNewList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let savedList = JSON.parse(localStorage.getItem("list")) || [];
    setList(savedList);
    setNewList(savedList);
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list, mount]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsAuth(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!employee.ename?.trim()) newErrors.ename = "Employee Name is required.";
    if (!employee.email?.trim())
      newErrors.email = "Employee Email is required.";
    if (!employee.department?.trim())
      newErrors.department = "Department is required.";
    if (!employee.salary?.toString().trim())
      newErrors.salary = "Salary is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!editId) {
      const newRecord = { ...employee, id: Date.now() };
      const updatedList = [...list, newRecord];
      setList(updatedList);
      setNewList(updatedList);
    } else {
      let updated = list.map((val) =>
        val.id === editId ? { ...val, ...employee } : val
      );
      setList(updated);
      setNewList(updated);
      navigate("/about");
    }

    setEmployee({});
    setEditId(null);
  };

  const handleDelete = (id) => {
    let updated = list.filter((val) => val.id !== id);
    setList(updated);
    setNewList(updated);
  };

  const handleEdit = (id) => {
    let data = list.find((val) => val.id === id);
    setEmployee(data);
    setEditId(id);
    navigate("/");
  };

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    if (!value.trim()) return setNewList(list);
    let filtered = list.filter((item) =>
      item.ename.toLowerCase().includes(value)
    );
    setNewList(filtered);
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
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
                newList={newList}
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
      <Route path="/signup" element={<Signup navigate={navigate} />} />
      <Route
        path="/"
        element={<Login setIsAuth={setIsAuth} navigate={navigate} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

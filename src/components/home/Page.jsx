import "./Page.css";

function Page({ employee, handleChange, handleSubmit, editId, errors }) {
  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="title">
          {editId ? "Update Employee" : "Add Employee Data"}
        </h2>

        <form onSubmit={handleSubmit} className="animated-form">
          <div className="field">
            <label>Employee Name :</label>
            <input
              type="text"
              name="ename"
              value={employee.ename || ""}
              onChange={handleChange}
              className={`input-box ${errors.ename ? "input-error" : ""}`}
            />
            {errors.ename && <p className="error-text mt-0 mb-0 fw-semibold">{errors.ename}</p>}
          </div>

          <div className="field">
            <label>Employee Email :</label>
            <input
              type="text"
              name="email"
              value={employee.email || ""}
              onChange={handleChange}
              className={`input-box ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <p className="error-text mt-0 mb-0 fw-semibold">{errors.email}</p>}
          </div>

          <div className="field">
            <label>Employee Department :</label>
            <input
              type="text"
              name="department"
              value={employee.department || ""}
              onChange={handleChange}
              className={`input-box ${errors.department ? "input-error" : ""}`}
            />
            {errors.department && (
              <p className="error-text mt-0 mb-0 fw-semibold">{errors.department}</p>
            )}
          </div>

          <div className="field">
            <label>Employee Salary :</label>
            <input
              type="number"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              className={`input-box ${errors.salary ? "input-error" : ""}`}
            />
            {errors.salary && <p className="error-text mt-0 mb-0 fw-semibold">{errors.salary}</p>}
          </div>

          <button className="submit-btn" type="submit">
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;

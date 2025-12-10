import { useState } from "react";
import "./Page.css";

function Page({ list, handleDelete, handleEdit, newList }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBtn, setActiveBtn] = useState("");
  const [sortOption, setSortOption] = useState("");


  const itemsPerPage = 4;

  const activeList = newList.length > 0 ? newList : list;

  const sortedList = [...activeList].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "salary") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortDropdown = (e) => {
    const option = e.target.value;
    setSortOption(option);

    if (option === "az") {
      setSortConfig({ key: "ename", direction: "asc" });
    } else if (option === "za") {
      setSortConfig({ key: "ename", direction: "desc" });
    }

    setCurrentPage(1);
  };

  const totalPages = Math.ceil(sortedList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = sortedList.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setActiveBtn("prev");
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setActiveBtn("next");
    }
  };

  return (
    <>
    <div className="body">
    <div className="container">
      <div className="row">
        <div className="col-md-12 mx-auto mt-5">
          <div className="mb-3 d-flex justify-content-end">
            <select
              className="form-select"
              value={sortOption}
              onChange={handleSortDropdown}
            >
              <option value="">Sort by Name</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>

          <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped text-center caption-top">
            <caption>
              <h2 className="text-center text-black mb-3">Employee Data</h2>
            </caption>

            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Employee Department</th>
                <th>Employee Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedList.length > 0 ? (
                paginatedList.map((value, index) => {
                  const { ename, email, department, salary, id } = value;
                  return (
                    <tr key={id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{ename}</td>
                      <td>{email}</td>
                      <td>{department}</td>
                      <td>{salary}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleEdit(id)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>Data Not Found.</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
            <button
              className={`btn ${
                activeBtn === "prev" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={goPrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <strong>
              Page {currentPage} of {totalPages}
            </strong>

            <button
              className={`btn ${
                activeBtn === "next" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={goNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Page;

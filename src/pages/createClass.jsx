import { useState } from "react";

function CreateClass() {
  const [className, setClassName] = useState("");
  const [classTimein, setClassTime] = useState("");
  const [classTimeOut, setClassTimeOut] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Class Name:", className);
    console.log("Class Time In:", classTimein);
    console.log("Class Time Out:", classTimeOut);
  };

  return (
    <div className="card p-3 mt-3">
      <div className="card-body">
        <h1 >Create Class</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            
            <div className ="mb-2">
                <label className="form-label">Class Name</label>
            </div>
            <input
              type="text"
              className="form-control"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Class Time In</label>
            <input
              type="time"
              className="form-control"
              value={classTimein}
              onChange={(e) => setClassTime(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Class Time Out</label>
            <input
              type="time"
              className="form-control"
              value={classTimeOut}
              onChange={(e) => setClassTimeOut(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateClass;

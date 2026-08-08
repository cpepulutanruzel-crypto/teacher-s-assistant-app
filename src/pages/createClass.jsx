import { useState } from "react";
import { saveSections } from "../utils/sectionStorage";

function CreateClass() {
  const [section, setSection] = useState({
    sectionName: "",
    sectionTimeIn: "",
    sectionTimeOut: "",
    sectionStudent : []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const sections = saveSections(section);
    console.log(sections);
    alert("Class saved successfully!");
    console.log("Class saved successfully!");

    setSection({
      sectionName: "",
      sectionTimeIn: "",
      sectionTimeOut: "",
    });
  };



  // function handleChange(e) {
  //   setSection({
  //     ...section,
  //     [e.target.name]: e.target.value,
  //   });
  // }
  const handleChange = (e) =>
    setSection({ ...section, [e.target.name]: e.target.value });

  return (
    <div className="card p-3 mt-3">
      <div className="card-body">
        <h1>Create Class</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="mb-2">
              <label className="form-label">Class Name</label>
            </div>
            <input
              type="text"
              className="form-control"
              name="sectionName"
              value={section.sectionName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Class Time In</label>
            <input
              type="time"
              name="sectionTimeIn"
              className="form-control"
              value={section.sectionTimeIn}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Class Time Out</label>
            <input
              type="time"
              name="sectionTimeOut"
              className="form-control"
              value={section.sectionTimeOut}
              onChange={handleChange}
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

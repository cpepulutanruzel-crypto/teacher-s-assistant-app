import { useState } from "react";
import { getSections, addStudentToSection } from "../utils/sectionStorage";

function StudentAdd() {
  const sections = getSections();

  const [student, setStudent] = useState({
    name: "",
    quizzes: "",
    assignment: "",
    exam: "",
    project: "",
    recitation: "",
    sectionId: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const submitStudent = (e) => {
    e.preventDefault();

    if (!student.sectionId) {
      alert("Please select a section.");
      return;
    }

    const newStudent = {
      name: student.name,
      quizzes: student.quizzes,
      assignment: student.assignment,
      exam: student.exam,
      project: student.project,
      recitation: student.recitation,
    };

    const result = addStudentToSection(Number(student.sectionId), newStudent);

    console.log("Updated sections:", result);

    setStudent({
      name: "",
      quizzes: "",
      assignment: "",
      exam: "",
      project: "",
      recitation: "",
      sectionId: "",
    });

    alert("Student added successfully!");
  };

  if (sections.length === 0) {
    return <p>You must create a class first.</p>;
  }

  return (
    <div className="container">
      <h2>Add Student</h2>

      <form onSubmit={submitStudent}>
        {/* SECTION */}
        <div className="mb-3">
          <label className="form-label">Section</label>

          <select
            className="form-select"
            name="sectionId"
            value={student.sectionId}
            onChange={handleChange}
          >
            <option value="">Select Section</option>

            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.sectionName}
              </option>
            ))}
          </select>
        </div>

        {/* STUDENT NAME */}
        <div className="mb-3">
          <label className="form-label">Student Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        {/* QUIZ */}
        <div className="mb-3">
          <label className="form-label">Quiz</label>

          <input
            type="number"
            className="form-control"
            name="quizzes"
            value={student.quizzes}
            onChange={handleChange}
          />
        </div>

        {/* ASSIGNMENT */}
        <div className="mb-3">
          <label className="form-label">Assignment</label>

          <input
            type="number"
            className="form-control"
            name="assignment"
            value={student.assignment}
            onChange={handleChange}
          />
        </div>

        {/* EXAM */}
        <div className="mb-3">
          <label className="form-label">Exam</label>

          <input
            type="number"
            className="form-control"
            name="exam"
            value={student.exam}
            onChange={handleChange}
          />
        </div>

        {/* PROJECT */}
        <div className="mb-3">
          <label className="form-label">Project</label>

          <input
            type="number"
            className="form-control"
            name="project"
            value={student.project}
            onChange={handleChange}
          />
        </div>

        {/* RECITATION */}
        <div className="mb-3">
          <label className="form-label">Recitation</label>

          <input
            type="number"
            className="form-control"
            name="recitation"
            value={student.recitation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          ADD
        </button>
      </form>
    </div>
  );
}

export default StudentAdd;

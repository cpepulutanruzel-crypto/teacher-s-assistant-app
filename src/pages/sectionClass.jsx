import { useParams } from "react-router-dom";
import { getSections } from "../utils/sectionStorage";

const SectionStudents = () => {
  const { id } = useParams();

  const sections = getSections();

  const getSection = sections.find((section) => section.id === Number(id));

  const getStudent = getSection?.sectionStudent || [];

  console.log("Section:", getSection);
  console.log("Students:", getStudent);
  // assignment: "12";
  // exam: "25";
  // id: 1786258194105;
  // name: "Jelica";
  // project: "22";
  // quizzes: "45";
  // recitation: "23";
  return (
    <div>
      <h2>{getSection?.sectionName}</h2>

      {getStudent.map((student) => (
        <div className="row" key={student.id}>
          <div className="col">
            <p>Name : {student.name}</p>
          </div>
          <div className="col">
            <p>Quiz : {student.quizzes}</p>
          </div>
          <div className="col">
            <p>Assignment : {student.assignment}</p>
          </div>
          <div className="col">
            <p>Project : {student.project}</p>
          </div>
          <div className="col">
            <p>Recitation : {student.recitation}</p>
          </div>
          <div className="col">
            <p>Exam : {student.exam}</p>
          </div>
        </div>
      ))}

      {/* <p>Section ID: {id}</p> */}
    </div>
  );
};

export default SectionStudents;

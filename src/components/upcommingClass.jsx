const UpcommingClasses = () => {
  const studentClass = [
    {
      section: "Mahogany",
      students: 26,
      timeIn: "10:00 AM",
      timeOut: "11:00 AM",
    },
    {
      section: "Maple",
      students: 28,
      timeIn: "11:00 AM",
      timeOut: "12:00 PM",
    },
    {
      section: "Oak",
      students: 30,
      timeIn: "12:00 PM",
      timeOut: "1:00 PM",
    },
  ];

  if (Object.keys(studentClass).length === 0) {
    return <p>No Upcomming Classes</p>;
  } else {
    return (
      <div className="d-flex flex-row mb-3 mt-3">
        <div className="row">
          {studentClass.map((sections) => (
            <div className="col-md-4 mb-3" key={sections.section}>
              <div className="card p-2 " id="upcomming-class-card">
                <div className="card-body">
                  <h5 className="card-title">{sections.section}</h5>
                  <p className="card-text">Students: {sections.students}</p>
                  <p className="card-text">Time In: {sections.timeIn}</p>
                  <p className="card-text">Time Out: {sections.timeOut}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
export default UpcommingClasses;

import { getSections } from "../utils/sectionStorage";

const sectionList = () => {
  const sections = getSections();

  if (sections.length === 0) {
    return <p>No Upcoming Classes</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-3 mt-3">
      {sections.map((section) => (
        <div key={section.id}>
          <div className="card" id="upcomming-class-card">
            <div className="card-body">
              <h5 className="card-title">{section.sectionName}</h5>

              <p className="card-text">Time In: {section.sectionTimeIn}</p>

              <p className="card-text">Time Out: {section.sectionTimeOut}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default sectionList;

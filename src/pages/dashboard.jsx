import UPCLASSES from "../components/upcommingClass.jsx";
import NAVBAR from "../components/NavBar.jsx";
function Dashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="item"><NAVBAR /></div>
        <div className="item"><UPCLASSES /></div>
        <div className="item">Footer</div>
      </div>
    </>
  );
}

export default Dashboard;

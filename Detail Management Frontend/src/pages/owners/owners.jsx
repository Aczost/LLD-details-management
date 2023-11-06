import "./owners.css";
import OwnersGrid from "./owners-grid/owners-grid";
import ContactForm from "../../components/form/form";
import Navbar from "../../components/navbar/navbar";

function Owners() {
  return (
    <div className="container">
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <ContactForm />
      </div>
      <OwnersGrid />
    </div>
  );
}

export default Owners;

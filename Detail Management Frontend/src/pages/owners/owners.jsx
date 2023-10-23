import "./owners.css";
import OwnersGrid from "./owners-grid/owners-grid";
import ContactForm from "../../components/form/form";

function Owners() {
  return (
    <div className="container">
      <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
        <ContactForm />
      </div>
      <OwnersGrid />
    </div>
  );
}

export default Owners;

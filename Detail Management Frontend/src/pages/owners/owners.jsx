import "./owners.css";
import OwnersGrid from "./owners-grid/owners-grid";
import ContactForm from "../../components/form/form";

function Owners() {
  return (
    <div className="container">
      <ContactForm />
      <OwnersGrid />
    </div>
  );
}

export default Owners;

import moment from "moment";
import React from "react";

const AsistenteRow = ({
  user,
  asistente,
  confirmCancel,
  postPayment,
  postAttend,
  single_class_id,
  hideButtons,
}) => {
  const sendWhatsApp = (telefono) => {
    telefono = String(telefono).replace("+52", "");
    window.open(`https://wa.me/521${telefono}`, "_blank");
  };

  return (
    <div className="row small p-2 py-3 align-items-center border-bottom">
      <div className="col">
        {asistente.birthday &&
          asistente.birthday !== null &&
          moment(asistente.birthday).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD") && (
            <i className="fa fa-birthday-cake"></i>
          )}
        {asistente.customer.name} {asistente.customer.last_name}
      </div>
      <div className="col">
        <i className="fab fa-instagram me-2"></i>
        {"@"}
        {asistente.instagram}
      </div>
      <div className="col ">
        <button
          className="me-2 btn-sm btn btn-success"
          onClick={() => sendWhatsApp(asistente.phone)}
        >
          <i className="fab fa-whatsapp"></i>
        </button>
        {asistente.phone}
      </div>
      <div className="col ">{asistente.spot}</div>
      <div className="col ">
        {!hideButtons && (
          <button
            className={`btn btn-sm btn-${
              !asistente.attend ? "outline-secondary" : "link text-dark"
            } me-2`}
            onClick={() =>
              postAttend(
                asistente.class_reservation_id,
                !asistente.attend,
                single_class_id
              )
            }
          >
            <i className="fa fa-check"></i>
          </button>
        )}
        {asistente.is_cash && !hideButtons && (
          <button
            className={`btn btn-sm btn-outline-${
              asistente.is_paid ? "danger" : "success"
            } mx-2`}
            onClick={() =>
              postPayment(
                asistente.class_reservation_id,
                !asistente.is_paid,
                single_class_id
              )
            }
          >
            <i className="fa fa-money-bill"></i>
          </button>
        )}
        {!user.instructor_id && !user.isManager && !hideButtons && (
          <button
            className="btn btn-sm btn-outline-danger mx-2"
            onClick={() => confirmCancel(asistente)}
          >
            <i className="fa fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default AsistenteRow;

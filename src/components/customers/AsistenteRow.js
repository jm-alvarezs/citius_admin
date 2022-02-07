import moment from "moment";
import React from "react";

const AsistenteRow = ({
  user,
  asistente,
  confirmCancel,
  postPayment,
  postAttend,
  single_class_id,
  is_special_event,
}) => {
  const sendWhatsApp = (telefono) => {
    telefono = String(telefono).replace("+52", "");
    window.open(`https://wa.me/521${telefono}`, "_blank");
  };

  return (
    <div className="card p-2 no-scale">
      <div className="row align-items-center">
        <div className="col my-2">
          {asistente.birthday &&
            asistente.birthday !== null &&
            moment(asistente.birthday).format("YYYY-MM-DD") ===
              moment().format("YYYY-MM-DD") && (
              <i className="fa fa-birthday-cake"></i>
            )}
          {asistente.customer.name} {asistente.customer.last_name}
        </div>
        <div className="col my-2">
          <i className="fab fa-instagram me-2"></i>
          {"@"}
          {asistente.instagram}
        </div>
        <div className="col my-2">
          <button
            className="me-2  btn btn-success"
            onClick={() => sendWhatsApp(asistente.phone)}
          >
            <i className="fab fa-whatsapp"></i>
          </button>
          {asistente.phone}
        </div>
        <div className="col my-2">{asistente.spot}</div>
        {!is_special_event && (
          <div className="col my-2">
            <button
              className={`btn btn-${
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
            {asistente.is_cash && (
              <button
                className={`btn btn-outline-${
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
            {!user.instructor_id && !user.isManager && (
              <button
                className="btn btn-outline-danger mx-2"
                onClick={() => confirmCancel(asistente)}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AsistenteRow;

import React, { useState } from "react";

export const FooterDatos = ({ currentPlan, changePlan, otherPlan }) => {
  const [style, setStyle] = useState(false);
  const handleStyle = () => {
    setStyle(!style);
  };

  return (
    <div className="footer">
      <div className="footer__container" onClick={handleStyle}>
        <div className="footer__principal">
          <h5 className="fw-bold fs-4">Plan {currentPlan.type}</h5>
          <h5 className="fw-bold fs-4">S/.{currentPlan.price} al mes</h5>
        </div>
        <div
          className={`footer__secundario d-flex flex-column align-items-center ${
            style ? "footer__toggle" : ""
          }`}
        >
          <p>{currentPlan.description}</p>
          <ul>
            {currentPlan.descriptionPlan ? (
              currentPlan.descriptionPlan.map(({ num, description }, i) => (
                <li
                  key={num}
                  className={`${
                    currentPlan.pack[i] !== num ? "text__opacity" : ""
                  }`}
                >
                  {description}
                </li>
              ))
            ) : (
              <p>Esperando lista ...</p>
            )}
          </ul>
        </div>
      </div>
      <button
        className="btn btn-link text-muted fw-semibold p-2 w-100"
        type="submit"
        onClick={changePlan}
      >
        Cambiar a plan {otherPlan.type ? otherPlan.type : "Estándar"}
      </button>
    </div>
  );
};

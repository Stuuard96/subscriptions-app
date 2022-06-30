import React from "react";

export const FooterDatos = ({ currentPlan, changePlan, otherPlan }) => {
  return (
    <div className="footer">
      <div className="footer__principal">
        <h5>Plan {currentPlan.type}</h5>
        <h5>S/.{currentPlan.price} al mes</h5>
      </div>
      <div className="footer__secundario">
        <p>{currentPlan.description}</p>
        <ul className="fa-ul ml-4">
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
      <button type="submit" onClick={changePlan}>
        Cambiar a plan {otherPlan.type ? otherPlan.type : "Estándar"}
      </button>
    </div>
  );
};

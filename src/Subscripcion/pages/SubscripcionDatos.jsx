import React, { useEffect, useState } from "react";
import dataPlan from "../../data/plan.json";
import dataPackPlan from "../../data/packPlan.json";
import { HeaderDatos } from "../components/HeaderDatos";

export const SubscripcionDatos = () => {
  const plan = dataPlan;
  const packPlan = dataPackPlan;

  const initialDates = {
    user: {
      name: "Nombre",
    },
    currentPlan: {
      type: "Premium",
    },
    otherPlan: {
      type: "Estándar",
    },
    dataAllPlan: [],
  };

  const [date, setDates] = useState(initialDates);
  const { currentPlan, otherPlan } = date;

  useEffect(() => {
    let { currentPlan, otherPlan } = date;

    const allData = plan.map((objPlan) => {
      objPlan.descriptionPlan = packPlan;

      if (currentPlan.type.toLowerCase() === objPlan.type.toLowerCase()) {
        currentPlan = objPlan;
      } else {
        otherPlan = objPlan;
      }

      return objPlan;
    });

    setDates({ dataAllPlan: allData, currentPlan, otherPlan });
  }, []);

  const changePlan = (e) => {
    e.preventDefault();
    setDates({ currentPlan: otherPlan, otherPlan: currentPlan });
  };

  return (
    <section className="section__datos">
      <HeaderDatos />
      <form className="form__datos">
        <label htmlFor="">Nombres y Apellidos</label>
        <input type="text" />
        <label htmlFor="">Numero de tarjeta</label>
        <input type="text" />
        <label htmlFor="">F. Expira</label>
        <input type="text" />
        <label htmlFor="">CVC</label>
        <input type="text" />
        <button>Pagar S/. {currentPlan.price}</button>
      </form>
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
    </section>
  );
};

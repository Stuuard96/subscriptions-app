import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import Cards from "react-credit-cards";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import dataPlan from "../../data/plan.json";
import dataPackPlan from "../../data/packPlan.json";
import { HeaderDatos } from "../components/HeaderDatos";
import { FooterDatos } from "../components/FooterDatos";

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

  const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();

  return (
    <section className="section__datos">
      <HeaderDatos />
      <div className="content__datos">
        <div className="datos__tarjeta">
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
        </div>
        <Form className="form__datos" onSubmit={handleSubmit}>
          <div className="datos__container">
            <Form.Group className="form-group">
              <Form.Label className="fw-bold m-0" htmlFor="cardName">
                Nombres y Apellidos
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="cardName"
                name="cardName"
                type="text"
                maxLength="40"
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cname}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="fw-bold m-0" htmlFor="number">
                Numero de tarjeta
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="cardNumber"
                name="cardNumber"
                type="number"
                // onInput={(e) => (e.target.value = e.target.value.slice(0, 20))}
                pattern="[\d| ]{16,22}"
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cnumber}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label className="fw-bold m-0" htmlFor="cardExpiration">
                    F. Expira
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="tel"
                    name="cardExpiration"
                    id="cardExpiration"
                    pattern="\d\d/\d\d"
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.cexp}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="form-group">
                  <Form.Label className="fw-bold m-0" htmlFor="cvc">
                    CVC
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="number"
                    name="cardSecurityCode"
                    id="cardSecurityCode"
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    isValid={errors.ccvv}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              id="validateButton"
              type="submit"
              className="btn__datos fw-bold fs-5 py-3 my-4"
            >
              Pagar S/. {currentPlan.price}
            </Button>
            {errors.show ? (
              <Alert
                id="alertMessage"
                className="m-0 fw-bold"
                variant={errors.variant}
                show={errors.show}
              >
                {errors.message}
              </Alert>
            ) : null}
          </div>
        </Form>
      </div>
      <FooterDatos
        changePlan={changePlan}
        currentPlan={currentPlan}
        otherPlan={otherPlan}
      />
    </section>
  );
};

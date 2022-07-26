import React, { useState } from "react";
import { useSelector } from "react-redux";
import { alertFeatureKey } from "../../../redux/alert/alert.reducer";

const Alert = () => {
  const alertList = useSelector(state => state[alertFeatureKey])
  return (
    <>
      {alertList.length > 0 ? (
        <div
          className={`alert alert-${alertList[0].color} alert-dismissible m-3 w-50 text-center mx-auto`}
        >
          {alertList.map((alert) => (
            <div key={alert.id}>
              <strong>{alert.message}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Alert;

import React from "react";
import MedicineCard from "./MedicineCard";
import SearchMedicines from "./SearchMedicines";

const OrderMedicine = () => {
  return (
    <>
      <SearchMedicines />
      {Array.from(Array(24).keys()).map((x) => {
        return <MedicineCard key={x} />;
      })}
    </>
  );
};

export default OrderMedicine;

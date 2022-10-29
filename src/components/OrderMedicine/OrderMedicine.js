import React, { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";
import SearchMedicines from "./SearchMedicines";
import Parse from "parse/dist/parse.min.js";
import { CircularProgress, Typography } from "@mui/material";

const OrderMedicine = ({ handleCartDetails, cartDetails }) => {
  const [medicines, setMedicines] = useState([]);
  const [filterValue, setFilterValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    const getMedicinesData = async function () {
      const parseQuery = new Parse.Query("Medicines");
      try {
        const Medicines = await parseQuery.find();
        const cartDetails = Medicines.map((product) => {
          return { ...product, cartCount: 0 };
        });
        setMedicines(Medicines);
        setFilteredMedicines(Medicines);
        handleCartDetails("medicines", cartDetails);
      } catch (error) {
        alert(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getMedicinesData();
  }, []);

  useEffect(() => {
    if (filterValue) {
      let filteredList = [];
      medicines.forEach((medicine) => {
        if (
          medicine.get("Name").toLowerCase() === filterValue.title.toLowerCase()
        ) {
          filteredList.push(medicine);
        }
      });
      setFilteredMedicines(filteredList);
    } else {
      setFilteredMedicines(medicines);
    }
  }, [filterValue]);

  return (
    <>
      <SearchMedicines
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        medicines={medicines}
      />
      {loading ? (
        <CircularProgress />
      ) : filteredMedicines.length ? (
        filteredMedicines.map((medicine, index) => {
          return (
            <MedicineCard
              cartDetails={
                cartDetails.filter((product) => product.id === medicine.id)[0]
              }
              handleCartDetails={handleCartDetails}
              key={index}
              medicine={medicine}
            />
          );
        })
      ) : (
        <Typography variant="h3">No Medicines Available</Typography>
      )}
    </>
  );
};

export default OrderMedicine;

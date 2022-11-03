import React, { useEffect, useMemo, useState } from "react";
import MedicineCard from "./MedicineCard";
import SearchMedicines from "./SearchMedicines";
import { CircularProgress, Typography } from "@mui/material";
import { useProductsContext } from "../ProductsContextProvider";

const OrderMedicine = ({ handleCartDetails }) => {
  const [filterValue, setFilterValue] = useState(null);
  const { products } = useProductsContext();
  const [productsList, setProductsList] = useState([]);
  
  useEffect(() => {
    filterValue
      ? setProductsList(() =>
          products.filter((product) => product.name === filterValue.title)
        )
      : setProductsList(products);

    return () => {};
  }, [products, filterValue]);

  const distinctProducts = useMemo(
    () =>
      [...new Set(products.map((product) => product.name))].map((title) => {
        return { title: title };
      }),
    []
  );

  return (
    <>
      {products.length ? (
        productsList.length ? (
          <>
            <SearchMedicines
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              searchList={distinctProducts}
            />
            {productsList.map((medicine, index) => {
              return (
                <MedicineCard
                  handleCartDetails={handleCartDetails}
                  key={index}
                  product={medicine}
                  displayPrescription={true}
                />
              );
            })}
          </>
        ) : (
          <CircularProgress disableShrink />
        )
      ) : (
        <Typography variant="h3">No Medicines Available</Typography>
      )}
    </>
  );
};

export default OrderMedicine;

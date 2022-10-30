import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Parse from "parse/dist/parse.min.js";

const ProductContext = createContext();
export const useProductsContext = () => useContext(ProductContext);

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMedicinesData = async function () {
      const parseQuery = new Parse.Query("Medicines");
      try {
        const medicines = await parseQuery.find();
        const products = medicines.map((medicine) => {
          const medicineName = medicine.get("Name");
          const name =
            medicineName.charAt(0).toUpperCase() +
            medicineName.slice(1).toLowerCase();

          const description = medicine.get("Description");
          const rating = medicine.get("Rating");
          const stock = medicine.get("Stock");
          const image = medicine.get("Image");
          const price = medicine.get("Price").replace("$", "₹");
          const sellCount = medicine.get("SellCount") || 0;

          return {
            id: medicine.id,
            name: name,
            description: description,
            rating: rating,
            stock: stock,
            image: image,
            price: price,
            sellCount: sellCount,
          };
        });

        setProducts(products);
      } catch (error) {
        alert(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getMedicinesData();
    return () => {};
  }, []);

  const handleProductCartActions = (action, productInfo) => {
    switch (action) {
      case "add":
        setProducts((prevState) => {
          return prevState.map((product) => {
            if (product.id === productInfo.id) {
              return {
                ...product,
                sellCount: product.sellCount + 1,
              };
            }
            return product;
          });
        });

        return;
      case "remove":
        if (productInfo.sellCount > 0) {
          setProducts((prevState) => {
            return prevState.map((product) => {
              if (product.id === productInfo.id) {
                return {
                  ...product,
                  sellCount: product.sellCount - 1,
                };
              }
              return product;
            });
          });
        }
        return;
      default:
        return;
    }
  };

  const getCartData = useCallback(() => {
    return products
      .map((product) => {
        return product.sellCount ? product : null;
      })
      .filter((product) => product);
  }, [products]);

  const value = {
    products,
    handleProductCartActions,
    getCartData,
  };

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  );
};

export default ProductsContextProvider;

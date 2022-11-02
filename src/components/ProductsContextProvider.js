import Parse from "parse/dist/parse.min.js";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContextProvider";

const ProductContext = createContext();
export const useProductsContext = () => useContext(ProductContext);

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getMedicinesData = async function () {
      const parseQuery = new Parse.Query("Medicines");
      try {
        const medicines = await parseQuery.find();
        const products = medicines.map((medicine) => {
          return destructureProductSchema(medicine);
        });

        setProducts(products);
      } catch (error) {
        console.log(error);
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
                cartCount: product.cartCount + 1,
              };
            }
            return product;
          });
        });

        return;
      case "remove":
        if (productInfo.cartCount > 0) {
          setProducts((prevState) => {
            return prevState.map((product) => {
              if (product.id === productInfo.id) {
                return {
                  ...product,
                  cartCount: product.cartCount - 1,
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
        return product.cartCount ? product : null;
      })
      .filter((product) => product);
  }, [products]);

  const proceedToCheckout = async () => {
    const checkoutItems = getCartData();
    let totalAmount = 0;
    const itemsName = checkoutItems.map((item) => item.name).join(",");
    checkoutItems.map((item) => {
      totalAmount =
        Number(totalAmount) +
        Number((Number(item.price.slice(1)) * item.cartCount).toFixed(2));
    });
    const checkoutObject = new Parse.Object("Orders");
    checkoutObject.set("userId", currentUser.id);
    checkoutObject.set("name", currentUser.get("username"));
    checkoutObject.set("items", itemsName);
    checkoutObject.set("deliveryAddress", "Hyderabad");
    checkoutObject.set("paymentMethod", "VISA ⠀•••• 3719");
    checkoutObject.set("amount", totalAmount);
    try {
      await checkoutObject.save();
      checkoutItems.map(async (item) => {
        await updateStockLimit(item);
      });
    } catch (error) {
      console.error("Error while creating ParseObject: ", error);
    }
  };

  const updateStockLimit = async (item) => {
    const query = new Parse.Query("Medicines");

    try {
      const object = await query.get(item.id);
      object.set("Stock", item.stock - item.cartCount);
      object.set("SellCount", item.sellCount + item.cartCount);
      const response = await object.save();
      const productData = destructureProductSchema(response);

      setProducts((prevState) => {
        return prevState.map((product) => {
          if (product.id === productData.id) {
            return {
              ...productData,
            };
          }
          return product;
        });
      });
    } catch (error) {
      console.error("Error while creating ParseObject: ", error);
    }
  };

  const getRecentOrdersForUser = async () => {
    const query = new Parse.Query("Orders");
    try {
      const results = await query.equalTo("userId", currentUser.id);
      return results.map((result) => {
        return {
          id: result.id,
          createdAt: result.createdAt.toDateString(),
          name: result.get("name"),
          items: result.get("items"),
          deliveryAddress: result.get("deliveryAddress"),
          paymentMethod: result.get("paymentMethod"),
          amount: Number(result.get("amount")).toFixed(2),
        };
      });
    } catch (error) {
      console.error("Error while fetching recent orders", error);
    }
  };

  const getSuggestedProducts = async (limit = 4) => {
    const parseQuery = new Parse.Query("Medicines");
    parseQuery.descending("sellCount");
    parseQuery.limit(limit);
    try {
      const products = await parseQuery.find();

      return products.map((product) => {
        return destructureProductSchema(product);
      });
    } catch (error) {
      console.error("Error while fetching recent orders", error);
    }
  };

  const getRecentlyOrderedProducts = async () => {
    const parseQuery = new Parse.Query("Medicines");
    parseQuery.descending("createdAt");
    parseQuery.limit(12);
    parseQuery.greaterThan("SellCount", 0);
    try {
      const products = await parseQuery.find();
      return products.map((product) => {
        return destructureProductSchema(product);
      });
    } catch (error) {
      console.error("Error while fetching recent orders", error);
    }
  };

  const value = {
    products,
    handleProductCartActions,
    getCartData,
    proceedToCheckout,
    getRecentOrdersForUser,
    getSuggestedProducts,
    getRecentlyOrderedProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  );
};

export default ProductsContextProvider;

function destructureProductSchema(medicine) {
  const medicineName = medicine.get("Name");
  const name =
    medicineName.charAt(0).toUpperCase() + medicineName.slice(1).toLowerCase();

  const description = medicine.get("Description");
  const rating = medicine.get("Rating");
  const stock = medicine.get("Stock");
  const image = medicine.get("Image");
  const price = medicine.get("Price").replace("$", "₹");
  const sellCount = medicine.get("SellCount") || 0;
  const cartCount = medicine.get("CartCount") || 0;
  const isPrescriptionRequired =
    medicine.get("IsPrescriptionRequired") || false;
  return {
    id: medicine.id,
    name: name,
    description: description,
    rating: rating,
    stock: stock,
    image: image,
    price: price,
    sellCount: sellCount,
    cartCount: cartCount,
    isPrescriptionRequired: isPrescriptionRequired
  };
}

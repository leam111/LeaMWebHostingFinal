import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Product = () => {
const API_URL = "https://claudeapi-txuf.onrender.com";

  const [product, setproduct] = useState([]);

  const fetchproducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/products`);
      setproduct(result.data);
    } catch (err) {
      console.error("error fetching products ", err);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  // const addtocart = async (name, id) => {
  //   alert(`${name} with id ${id}added to the cart!`);
  // };

  return (
    <>
      <h2 className="text-center">Products </h2>
      <br></br>

      {product.length === 0 ? (
        <p className="text-center">no products!</p>
      ) : (
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
          className="container"
        >
          {product.map((products) => (
            <div
              key={products.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "300px",
                height: "500px",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                transform: "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
               src={`${API_URL}/images/${products.image}`}
                alt={products.description}
                className=""
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h4 className="text-center">{products.name}</h4>
              <p className="text-center">${products.price}</p>
              <p className="text-center">{products.description}</p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <div className="text-center">
                
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Admin() {
  const [products, setproducts] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [products2, setproducts2] = useState([]);

const API_URL = "http://localhost:5000";



  const fetchproducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/products`);
      setproducts2(result.data);
    } catch (err) {
      console.error("error fetching products ", err);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const handlechange = (e) => {
    setproducts({ ...products, [e.target.name]: e.target.value });
  };

  const handledelete = async (id) => {
    if (!window.confirm("are you sure you want to delete this student")) return;
    try {
      const res = await axios.delete(`${API_URL}/delete/${id}`);
      setproducts2(products2.filter((s) => s.id !== id));
      alert("product deleted");
    } catch (error) {
      console.error("error deleting produc:", error);
      alert("failed to delete product");
    }
  };

  const handleupdate = async (id) => {
    const newName = prompt("Enter new name:");
    const newDescription = prompt("Enter new description:");
    const newPrice = prompt("Enter new price:");
    const newCategory = prompt("Enter new category:");
    const newImage = prompt("Enter new image URL:");
    if (!newName || !newPrice) {
      alert("Update cancelled");
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/update/${id}`,{name: newName,description: newDescription,price: newPrice,category: newCategory,
        image: newImage,
      });
      fetchproducts();
      alert("product updated");
    } catch (error) {
      console.error("error updating product:", error);
      alert("failed to update product");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/insert`, products);


      setproducts2([...products2, res.data]);

      setproducts({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      alert("product added successfully!!!");
    } catch (err) {
      console.error("error adding product", err);
      alert("failed to add product");
    }
  };

  return (
    <div className="App ">
  
      <h1 className="text-center">Admin Product Page</h1>

    <div className="container" style={{ maxWidth: "600px" }}>
  <form onSubmit={handlesubmit}>
    <div className="mb-3 form-floating">
      <input
        type="text"
        className="form-control form-control-sm"
        onChange={handlechange}
        name="name"
        value={products.name}
        required
        id="name"
        placeholder="Name"
      />
      <label htmlFor="name">Name</label>
    </div>

    <div className="mb-3 form-floating">
      <input
        type="text"
        className="form-control form-control-sm"
        onChange={handlechange}
        name="description"
        value={products.description}
        required
        id="description"
        placeholder="Description"
      />
      <label htmlFor="description">description</label>
    </div>

    <div className="mb-3 form-floating">
      <input
        type="number"
        min={1}
        max={1000}
        className="form-control form-control-sm"
        onChange={handlechange}
        name="price"
        value={products.price}
        required
        id="price"
        placeholder="Price"
      />
      <label htmlFor="price">Price(decimal optional)</label>
    </div>

    <div className="mb-3 form-floating">
      <input
        type="text"
        className="form-control form-control-sm"
        onChange={handlechange}
        required
        name="category"
        value={products.category}
        id="category"
        placeholder="Category"
      />
      <label htmlFor="category">Category</label>
    </div>

    <div className="mb-3 form-floating">
      <input
        type="text"
        className="form-control form-control-sm"
        onChange={handlechange}
        name="image"
        required
        value={products.image}
        id="image"
        placeholder="Image URL"
      />
      <label htmlFor="image">Image(URL)</label>
    </div>
<div className="text-center">
<button type="submit" className="btn btn-primary text-center">Add Product</button>
</div>
  </form>
</div>
      <br></br>
      <br></br>

      <h3 className="text-center">current products:</h3>

      {products2.length === 0 ? (
        <p className="text-center">no products!</p>
      ) : (
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
          className="container"
        >
          {products2.map((products) => (
  <div
    key={products.id}
    style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "10px",
      width: "300px",
      height: "500px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
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
                <button
                  className="btn btn-danger btn-md"
                  onClick={() => handledelete(products.id)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-warning btn-md"
                  onClick={() => handleupdate(products.id)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;

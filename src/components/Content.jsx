import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductCard = ({ title, price, description, category, image ,rating}) => (
  <div className="card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    {/* <p>{description}</p> */}
    <p>Category: {category}</p>
    <p>Price: {price}</p>
    <p>rating {rating.rate}</p>

    <button>Add card</button>
  </div>
);

const ProductList = ({ products }) => (
  <div className="card-list">
    {products.map((product, index) => (
      <ProductCard key={index} {...product} />
    ))}
  </div>
);

const FilterNav = ({ categories, handleCategoryChange, handlePriceChange }) => (
  <nav className="filter-nav">
    <h3>Filter</h3>
    <label htmlFor="category">Category:</label>
    <select id="category" onChange={handleCategoryChange}>
      <option value="all">All</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>

    <label htmlFor="price">Price:</label>
    <select id="price" onChange={handlePriceChange}>
      <option value="all">All</option>
      <option value="0-50">0 - 50</option>
      <option value="50-100">50 - 100</option>
      <option value="100-150">100 - 150</option>
      <option value="over150">Over 150</option>
    </select>
  </nav>
);

function Content() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setIsLoaded(true);
        setItems(response.data);
        setFilteredItems(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  useEffect(() => {
    let tempFilteredItems = items;

    if (selectedCategory !== "all") {
      tempFilteredItems = tempFilteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedPrice === "0-50") {
      tempFilteredItems = tempFilteredItems.filter((item) => item.price <= 50);
    } else if (selectedPrice === "50-100") {
      tempFilteredItems = tempFilteredItems.filter(
        (item) => item.price > 50 && item.price <= 100
      );
    } else if (selectedPrice === "100-150") {
      tempFilteredItems = tempFilteredItems.filter(
        (item) => item.price > 100 && item.price <= 150
      );
    } else if (selectedPrice === "over150") {
      tempFilteredItems = tempFilteredItems.filter((item) => item.price > 150);
    }

    setFilteredItems(tempFilteredItems);
  }, [selectedCategory, selectedPrice]);

  return (
    <div className="item-content">
      <FilterNav
        categories={categories}
        handleCategoryChange={(event) =>
          setSelectedCategory(event.target.value)
        }
        handlePriceChange={(event) => setSelectedPrice(event.target.value)}
      />
      <h4>content</h4>
      <ProductList products={filteredItems} />
    </div>
  );
}

export default Content;

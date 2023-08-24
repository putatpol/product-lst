import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Content() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setIsLoaded(true);
        setItems(response.data);
        console.log(response.data); // Log the received data
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h4>content</h4>
      <p></p>
    </div>
  );
}

export default Content;

import { useEffect, useState } from "react";

export const useAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState();
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/categories/",
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await response.json();
      setCategories(result.result);
    };
    getCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const body = {};
    if (search) {
      body.q = search;
    }
    if (categoryId) {
      body.category_id = categoryId;
    }
    if (minPrice) {
      body.min_price = minPrice;
    }
    if (maxPrice) {
      body.max_price = maxPrice;
    }

    fetch(import.meta.env.VITE_API_URL + "/annonces/search", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => setAnnonces(data.result));
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [search, categoryId, minPrice, maxPrice]);
  
  return {
    annonces,
    categories,
    isLoading,
    error,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categoryId,
    setCategoryId,
  };
};

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
      const response = await fetch(import.meta.env.VITE_API_URL+"/categories/", {
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setCategories(result.result);
    };
    getCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const params = {};
    if (search) {
      params.q = search;
    }
    if (categoryId) {
      params.category_id = categoryId;
    }
    if (minPrice) {
      params.min_price = minPrice;
    }
    if (maxPrice) {
      params.max_price = maxPrice;
    }

    fetch("/annonces/search", {
      params,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => setAnnonces(res.data))
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

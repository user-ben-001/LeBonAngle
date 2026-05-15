export const SearchBar = (props) => {
  const {
    categories,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categoryId,
    setCategoryId,
  } = props;
  return (
    <div>
      <input
        name="searchBar"
        id="searchBar"
        placeholder="Recherche"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>Toutes les Catégories</option>
        {categories.map((cat) => {
          return (
            <option value={cat.id} key={cat.id}>
              {cat.title}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        placeholder="prix min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        min={0}
      />
      <input
        type="number"
        placeholder="prix max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        min={0}
      />
    </div>
  );
};

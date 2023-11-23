import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigator = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;

    navigator(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search order"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="transaction-all w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72 "
      />
    </form>
  );
}

export default SearchOrder;

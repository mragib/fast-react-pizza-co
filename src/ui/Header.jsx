import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-4 py-3 focus:ring-opacity-50 sm:px-6">
      <Link to="/" className="tracking-widest sm:text-base">
        Fast React Pizza co.
      </Link>

      <SearchOrder />

      <UserName />
    </header>
  );
}

export default Header;

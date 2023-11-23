import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartQuantity, getCartTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizzaQuantity = useSelector(getCartQuantity);
  const totalPizzaPrice = useSelector(getCartTotalPrice);

  if (!totalPizzaQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 md:space-x-6 md:text-base">
        <span>{totalPizzaQuantity} pizzas</span>
        <span>{formatCurrency(totalPizzaPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

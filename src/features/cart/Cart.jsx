import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="pt-12 font-semibold">Your cart, {username}</h2>
      <ul className="mt-6 divide-y divide-stone-400 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-8 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearItem())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateCartItem from "../cart/UpdateCartItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const ItemQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = ItemQuantity > 0;

  function addToCart(e) {
    e.preventDefault();

    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="text-medium">{name}</p>
        <p className="text-sm capitalize text-stone-600">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-stone-600">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          {isInCart && (
            <div className="flex items-center gap-3 md:gap-6">
              <UpdateCartItem pizzaId={id} currentQuantity={ItemQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={addToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

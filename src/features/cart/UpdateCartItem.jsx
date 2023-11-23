import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem } from "./cartSlice";

function UpdateCartItem({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateCartItem;

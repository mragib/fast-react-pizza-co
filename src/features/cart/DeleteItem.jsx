import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(removeItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;

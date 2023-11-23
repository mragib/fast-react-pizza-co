import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getCartTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    error: addressError,
    address,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const formError = useActionData();

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getCartTotalPrice);

  const priortyPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priortyPrice;

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <button onClick={() => dispatch(fetchAddress())}>Get Position</button>
      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-4 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 inline rounded-md bg-red-200 px-2 text-xs text-red-800">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 inline rounded-md bg-red-200 px-2 text-xs text-red-800">
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              disabled={isLoadingAddress}
            >
              Get Address
            </Button>
          )}
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <div>
          <Button type="primary" disabled={isSubmiting}>
            {isSubmiting || isLoadingAddress
              ? "Placing your order"
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  const error = {};

  if (!isValidPhone(order.phone))
    error.phone = "Please provide your phone number. We will contact with you.";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);
  store.dispatch(clearItem());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center text-sm sm:my-16 md:px-6 md:text-base">
      <h1 className=" mb-4 text-xl font-semibold uppercase md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;

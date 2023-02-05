import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Outlet />
    </div>
  );
};

export default Navigation;

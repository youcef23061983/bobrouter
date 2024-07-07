import { redirect } from "react-router-dom";

const RequireAuth = async (request) => {
  const isLoggedIn = localStorage.getItem("loggedin");
  const pathname = new URL(request.url).pathname;
  console.log(pathname);

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=you must login first.&redirectTo=${pathname}`
    );
  }
  return isLoggedIn;
};

export default RequireAuth;

import Cookie from "js-cookie";

const Home = () => {
  const accessToken = Cookie.get("access_token");
  const refreshToken = Cookie.get("refresh_token");

  return (
    <div>
      <h1>Home Page</h1>
      <p>Access Token: {accessToken || "No token found"}</p>
      <p>Refresh Token: {refreshToken || "No token found"}</p>
    </div>
  );
};

export default Home;

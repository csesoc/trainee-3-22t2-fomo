import useAuth from "./useAuth";
import env from "react-dotenv";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    let accessToken = undefined;
    await fetch(env.API_URL + "/refresh", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAuth({ accessToken: data.accessToken });
        accessToken = data.accessToken;
      })
      .catch((err) => {
        console.log(JSON.parse(err));
      });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;

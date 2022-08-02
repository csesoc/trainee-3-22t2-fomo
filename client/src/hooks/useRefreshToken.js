import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        let accessToken = undefined;
        await fetch("http://localhost:5000/refresh", {
            method: "get",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          .then((response) => response.json())
          .then((data) => {
            
            setAuth({ accessToken: data.accessToken });
            accessToken = data.accessToken;
            })
          .catch(err => {console.log(JSON.parse(err))});
        return accessToken;
    }
    return refresh;
}

export default useRefreshToken;
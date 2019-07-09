import axios from "axios";

export const login = (email, password, history) => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };

  //gör om objekt till JSON
  const body = JSON.stringify({ email, password });
  console.log(body);

  try {
    //får tillbaka token
    const response = await axios.post("/api/users/login", body, config);

    dispatch({
      type: "LOGIN_USER",
      payload: response.data
    });
    dispatch({
      type: "HIDE_MODAL"
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: err.response.data.msg
    });
  }
};

export const register = ({
  email,
  password,
  username,
  firstName,
  lastName,
  role
}) => async dispatch => {
  const config = {
    //   headers så att den vet att vi postar som json
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    email,
    password,
    username,
    firstName,
    lastName,
    role
  });

  //gör om objekt till JSON

  try {
    const response = await axios.post("/api/users/login", body, config);

    dispatch({
      type: "LOGIN_USER",
      payload: response.data
    });
    dispatch({
      type: "HIDE_MODAL"
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: err
    });
  }
};

// AUTH USER FROM LOCALSTORAGE IF TOKEN EXISTS
export const authUser = () => async dispatch => {
  console.log("qweqweweq");
  try {
    const response = await axios.get("/users/auth");

    dispatch({
      type: "LOAD_USER",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

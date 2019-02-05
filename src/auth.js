export const isAuthenticated = () => {
  if (localStorage.getItem("auth")) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

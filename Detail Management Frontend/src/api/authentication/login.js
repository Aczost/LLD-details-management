import Cookies from "js-cookie";

const handleCookies = () => {
  try {
    Cookies.set("expirationTime", `${Date.now() + 3600000}`);
    Cookies.set("isLogin", true);
    Cookies.set('userInfo', btoa('Link Leaser Die User'));
  }
  catch (error) {
    console.log(error);
  }
}

export default handleCookies;

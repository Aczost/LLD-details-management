import Cookies from "js-cookie";

const deleteCookie = () => {
  try {
    Cookies.remove('expirationTime');
    Cookies.remove('isLogin');
    Cookies.remove('userInfo');
    window.location.reload();
  } catch (error) {
    console.log(`Error deleting cookie:`, error);
  }
};

export default deleteCookie;

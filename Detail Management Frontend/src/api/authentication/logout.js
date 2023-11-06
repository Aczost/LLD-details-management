import Cookies from "js-cookie";

const deleteCookie = (navigate) => {
  try {
    Cookies.remove('expirationTime');
    Cookies.remove('isLogin');
    Cookies.remove('userInfo');
    navigate('/');  
  } catch (error) {
    console.log(`Error deleting cookie:`, error);
  }
};

export default deleteCookie;

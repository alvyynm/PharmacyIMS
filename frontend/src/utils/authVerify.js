import jwtDecode from 'jwt-decode';

export const authValidator = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired
      console.log('Token has expired');
      return false;
    } else {
      // Token is still valid
      console.log('Token is still valid');
      return true;
    }
  } else {
    // No token found, user not authenticated
    console.log('User not authenticated');
    return false;
  }
};

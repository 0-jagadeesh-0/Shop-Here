var isAuthenticated = false;

if (localStorage.getItem("token")) {
    isAuthenticated = true;
}

export default isAuthenticated;
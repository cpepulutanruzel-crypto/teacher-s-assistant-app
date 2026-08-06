// Import useContext because we need to read AuthContext data.
import { useContext } from "react";


// Import our authentication context.
import { AuthContext } from "../context/AuthContext";


// Create a reusable function called useAuth.
function useAuth() {


    // Get everything stored inside AuthContext.
    //
    // Example:
    //
    // {
    //    token,
    //    login,
    //    logout
    // }
    //
    const auth = useContext(AuthContext);



    // Return the authentication data.
    return auth;

}


// Export so other components can use it.
export default useAuth;
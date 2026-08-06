
import { generateToken } from "../utils/tokenGenerator";


export function fakeLogin(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({
          success: true,
          token: generateToken()
        });
      } else {
        resolve({
          success: false,
          message: "Invalid username or password",
        });
      }
    }, 1000);
  });
}
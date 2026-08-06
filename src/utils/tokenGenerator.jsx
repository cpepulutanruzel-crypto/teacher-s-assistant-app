// Function to generate a fake token
export function generateToken() {

    // Create random characters
    const randomString = Math.random()
        .toString(36)
        .substring(2);


    // Add current time
    const timestamp = Date.now();


    // Combine them as a fake token
    return `${randomString}-${timestamp}`;

}
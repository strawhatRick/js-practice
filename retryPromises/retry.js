// retrying function - using then... catch block
function fetchData(apiURL, retries = 0, delay = 1000) {
  // return a promise
  return new Promise((resolve, reject) => {
    fetch(apiURL)
      .then((response) => {
        // if response doesn't have data
        if (!response.ok) {
          if (retries > 0) {
            console.warn(
              "Api call failed with status",
              response.status,
              "retrying..."
            );
            // retry
            return new Promise((resolveRetry) => {
              setTimeout(
                () => resolveRetry(fetchData(apiURL, retries - 1, delay * 2)),
                delay
              );
            });
          } else {
            // retries exhausted
            return reject(new Error("Api request failed", response.status));
          }
        }
        // response returned
        return response.json();
        // data returned after successful api call
      })
      .then((data) => resolve(data))
      // if Api call fails
      .catch((error) => {
        // retry api
        if (retries > 0) {
          console.warn("Error fetching data, retrying...");
          setTimeout(
            () => reject(fetchData(apiURL, retries - 1, delay * 2)),
            delay
          );
          // retries exhausted
        } else {
          reject(error);
        }
      });
  });
}

const apiURL = "https://api.example.com/data";
const retries = 5,
  delay = 100;

fetchData(apiURL, retries, delay)
  .then((data) => {
    console.log("API response: ", data);
  })
  .catch((error) => {
    console.log("Error fetching data even after retries!", error.message);
  });

async function fetchDataAsync(apiURL, retries = 0, delay = 1000) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      if (retries > 0) {
        console.warn(
          "Api request failed with status ",
          response.status,
          ", retrying..."
        );
        // delay
        await new Promise((resolve) => setTimeout(resolve, delay));
        // calling api with updated delay
        return fetchDataAsync(apiURL, retries - 1, delay * 2);
      }
      throw new Error("Api request failed with status ", response.status);
    }
    // returning response if successful!
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn("Error fetching data, retryin...");
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchDataAsync(apiURL, retries - 1, delay * 2);
    }
    throw error;
  }
}

// const apiURL = 'https://api.example.com/data'
// const retries = 5, delay = 400

// fetchDataAsync(apiURL, retries, delay).then(data => {
//     console.log('API response: ', data)
// }).catch(error => {
//     console.log('Error fetching data even after retries!', error.message)
// })

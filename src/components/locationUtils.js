// locationUtils.js

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
      // Check if the browser supports Geolocation
      if (navigator.geolocation) {
          // Check for permission status
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
              if (result.state === 'granted' || result.state === 'prompt') {
                  navigator.geolocation.getCurrentPosition(
                      (position) => {
                          resolve({
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                          });
                      },
                      (error) => reject(error),
                      { enableHighAccuracy: true }
                  );
              } else {
                  reject(new Error("Geolocation permission denied."));
              }
          });
      } else {
          reject(new Error("Geolocation is not supported by this browser."));
      }
  });
};

export const fetchCityName = async (latitude, longitude) => {
  const apiKey = '8b3ec60cce114165b8042407b6d316d4'; // Replace with your actual API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data and data.results are defined
      if (data && data.results && data.results.length > 0) {
          const city = data.results[0]?.components?.city || 'Unknown location';
          return city;
      } else {
          return 'Unknown location';
      }
  } catch (error) {
      console.error('Error fetching city name:', error);
      return 'Unknown location';
  }
};

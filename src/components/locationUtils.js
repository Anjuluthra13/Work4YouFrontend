// Get user location coordinates
export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
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
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };
  
  // Fetch city name using OpenCage Geocoder API
  export const fetchCityName = async (latitude, longitude) => {
    const apiKey = '8b3ec60cce114165b8042407b6d316d4'; // Replace with your actual API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        const components = data.results[0]?.components;
        
        // Try to get city, town, village, or fallback to region or state
        const city = components.city || components.town || components.village || components.state || components.county || 'Unknown location';
        return city;
      } else {
        return 'Unknown location';
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
      return 'Unknown location';
    }
  };
  

const axios = require("axios");

module.exports.getCoordinates = async (location) => {
    try {
        const url = "https://nominatim.openstreetmap.org/search";

        const res = await axios.get(url, {
            params: {
                q: location,
                format: "json"
            },
            headers: {
                "User-Agent": "wanderlust-app (your-email@gmail.com)" // 🔥 REQUIRED
            }
        });

        if (res.data.length > 0) {
            return {
                lat: parseFloat(res.data[0].lat),
                lon: parseFloat(res.data[0].lon)
            };
        }

        return null;
    } catch (err) {
        console.log("GEOCODING ERROR:", err.message);
        return null;
    }
};
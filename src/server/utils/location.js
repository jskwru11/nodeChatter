
const locationGenerator = (sender, location) => {
    const lat = location.lat;
    const lng = location.lng;

    return {
        from: sender,
        url: `https://google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    };
};

module.exports = locationGenerator;
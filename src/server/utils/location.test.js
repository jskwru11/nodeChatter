const locationGenerator = require("./location");
const expect = require("expect");


describe('locationMessage', () => {
    it('should generate correct location object', () => {
        const sender = 'Admin';
        const location = {
            lat: 35.7681696,
            lng: -79.0564127
        };
        const locationObj = locationGenerator(sender, location);
        expect(typeof (locationObj.createdAt)).toBe('number');
        expect(locationObj).toMatchObject({
            from: sender,
            url: locationObj.url
        });
    });
});


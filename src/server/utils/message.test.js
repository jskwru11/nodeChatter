const expect = require("expect");
const messageGenerator = require("./message");

describe('generate message', () => {
    it('should generate correct message object', () => {
        const fromField = 'Admin';
        const text = 'Hello';
        const res = messageGenerator(fromField, text);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({
            from: fromField,
            text: text
        });

    });
});
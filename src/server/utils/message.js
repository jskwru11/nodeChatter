

const messageGenerator = (name, text) => {
    name = name;
    text = text;

    return {
        from: name,
        text: text,
        createdAt: new Date().getTime()
    };
};

module.exports = messageGenerator;
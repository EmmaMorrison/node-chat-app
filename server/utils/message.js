let timeStamp = new Date().toLocaleString();

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: timeStamp
  }
};

module.exports = {generateMessage};

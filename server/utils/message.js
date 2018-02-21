let timeStamp = new Date().toLocaleString();

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: timeStamp
  }
};

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: timeStamp
  }
}

module.exports = {generateMessage, generateLocationMessage};

let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = "testUser";
    let text = "Test message";
    let message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');

    console.log(message.from);
    console.log(message.text);
    console.log(message.createdAt, typeof message.createdAt);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = "testUser";
    let latitude = 5.5;
    let longitude = 4;
    let message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe(from);
    expect(message.url).toInclude(latitude,longitude);
    expect(message.createdAt).toBeA('number');

    console.log(message.url);
  });
});

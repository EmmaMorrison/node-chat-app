let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = "testUser";
    let text = "Test message";
    let message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('string');

    console.log(message.from);
    console.log(message.text);
    console.log(message.createdAt, typeof message.createdAt);
  });
});

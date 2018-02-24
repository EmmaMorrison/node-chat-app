const expect = require('expect');
let {isRealString} = require('./validation');


  describe('isRealString', () => {
    it('should reject non-string values', () => {
      let name = 999;

      expect(isRealString(name))
        .toNotBeA('string')
        .toBe(false)
    });

    it('should reject string with only spaces', () => {
      let name = '   ';

      expect(isRealString(name))
        .toNotBeA('string')
        .toBe(false)

    });

    it('should allow string with non-space characters', () => {
      let name = 'A B C   ';

      expect(isRealString(name)).toBe(true);
    });

  });

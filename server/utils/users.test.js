const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Emma',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Ash',
      room: 'TF2'
    } , {
      id: '3',
      name: 'Dan',
      room: 'TF2'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Emma',
      room: 'Morrison'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let resRemoved = users.removeUser('2');

    expect(resRemoved).toInclude({id: '2', name: 'Ash', room: 'TF2'});
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let resRemoved = users.removeUser('4');

    expect(resRemoved).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let getUser = users.getUser('1');

    expect(getUser).toInclude({id: '1', name: 'Emma', room: 'Node course'});
  });

  it('should not find user', ( ) => {
    let getUser = users.getUser('4');

    expect(getUser).toNotExist();
  });

  it('should return names for TF2', () => {
    let userList = users.getUserList('TF2');

    expect(userList).toEqual(['Ash', 'Dan']);
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node course');

    expect(userList).toEqual(['Emma']);
  });
});

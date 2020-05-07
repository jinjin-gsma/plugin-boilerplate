import {init} from './../src/js/template.js';

describe('Todo', function () {
  it('todo', () => {
    init();
    console.log(document);
    expect(true).toEqual(true);
  });
});
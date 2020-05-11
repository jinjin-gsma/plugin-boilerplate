import {Template} from './../src/js/template.js';

describe('Init', function () {
  it('Should create instance', () => {
    const template = new Template();
    expect(template).toBeDefined();
  });
});
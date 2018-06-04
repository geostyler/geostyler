/* tslint:disable */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


// Range poylfill comes from:
// https://stackoverflow.com/questions/42213522/mocking-document-createrange-for-jest

global.Range = function Range() {};

const createContextualFragment = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0]; // so hokey it's not even funny
};

Range.prototype.createContextualFragment = (html) => createContextualFragment(html);

// HACK: Polyfil that allows codemirror to render in a JSDOM env.
global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 };
    },
    getClientRects: () => [],
    createContextualFragment,
  };
};

const { TestEnvironment } = require('jest-environment-jsdom');
const { TextEncoder } = require('util');

/**
 * A custom environment to set the TextEncoder.
 */
module.exports = class CustomTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder;
    }
    // https://github.com/jsdom/jsdom/issues/3363
    this.global.structuredClone = structuredClone;
  }
};

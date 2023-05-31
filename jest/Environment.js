import Environment from 'jest-environment-jsdom';
import { TextEncoder } from 'util';

/**
 * A custom environment to set the TextEncoder.
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder;
    }
    // https://github.com/jsdom/jsdom/issues/3363
    this.global.structuredClone = structuredClone;
  }
};

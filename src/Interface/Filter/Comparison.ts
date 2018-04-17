import Filter from './Filter';

export default interface Comparison extends Filter {
  1: string|number|boolean|null;
  2: string|number|boolean|null;
}

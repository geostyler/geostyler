import Filter from './Filter';

export default interface Negation extends Filter {
  1: boolean|Filter;
}

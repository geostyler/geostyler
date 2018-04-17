import Operator from '../../Type/Operator';

export interface Filter extends Array<any> {
  0: Operator;
}

export interface Negation extends Filter {
  1: boolean|Filter;
}

export interface Comparison extends Filter {
  1: string|number|boolean|null;
  2: string|number|boolean|null;
}

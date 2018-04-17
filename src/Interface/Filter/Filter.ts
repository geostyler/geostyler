import Operator from '../../Type/Operator';

export default interface Filter extends Array<any> {
  0: Operator;
}

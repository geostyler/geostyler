import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'GeoStyler Template Style',
  type: 'Point',
  rules: [{
    name: 'City of Bonn',
    filter: ['==', 'Name', 'Bonn'],
    scaleDenominator: {
      min: 10000,
      max: 20000
    },
    symbolizer: {
      kind: 'Circle',
      color: '#FF0000',
      radius: 6,
      strokeColor: '#000000',
      strokeWidth: 2
    }
  }]
};

export default pointSimplePoint;

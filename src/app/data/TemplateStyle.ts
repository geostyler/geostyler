import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'GeoStyler Template Style',
  rules: [{
    name: 'City of Bonn',
    filter: [
      '&&',
      ['==', 'state', 'germany'],
      [
        '||',
        ['>=', 'population', 100000],
        ['<', 'population', 200000]
      ],
      [
        '!',
        ['==', 'name', 'Schalke']
      ]
    ],
    scaleDenominator: {
      min: 10000,
      max: 20000
    },
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'Circle',
      color: '#FF0000',
      radius: 6,
      strokeColor: '#000000',
      strokeWidth: 2
    }]
  }]
};

export default pointSimplePoint;

export const geostylerFunctionConfigs = [
  {
    name: 'abs'
  },
  {
    name: 'acos'
  },
  {
    name: 'asin'
  },
  {
    name: 'atan'
  },
  {
    name: 'atan2'
  },
  {
    name: 'ceil'
  },
  {
    name: 'cos'
  },
  {
    name: 'exp'
  },
  {
    name: 'floor'
  },
  {
    name: 'log'
  },
  {
    name: 'max'
  },
  {
    name: 'min'
  },
  {
    name: 'modulo'
  },
  {
    name: 'pi'
  },
  {
    name: 'pow'
  },
  {
    name: 'random'
  },
  {
    name: 'rint'
  },
  {
    name: 'round'
  },
  {
    name: 'sin'
  },
  {
    name: 'sqrt'
  },
  {
    name: 'strIndexOf',
  },
  {
    name: 'strLastIndexOf'
  },
  {
    name: 'strLength'
  },
  {
    name: 'tan'
  },
  {
    name: 'toDegrees'
  },
  {
    name: 'toRadians'
  },
  {
    name: 'numberFormat'
  },
  {
    name: 'strAbbreviate',
    type: 'string',
  },
  {
    name: 'strCapitalize',
    type: 'string',
  },
  {
    name: 'strConcat',
    type: 'string',
  },
  {
    name: 'strDefaultIfBlank',
    type: 'string',
  },
  {
    name: 'strReplace',
    type: 'string',
    args: [{
      type: 'string',
      placeholder: '… target string'
    }, {
      type: 'string',
      placeholder: '… what to replace'
    }, {
      type: 'string',
      placeholder: '… replace with'
    }, {
      type: 'boolean',
      label: 'global'
    }]
  },
  {
    name: 'strStripAccents',
    type: 'string',
  },
  {
    name: 'strSubstring',
    type: 'string',
  },
  {
    name: 'strSubstringStart',
    type: 'string',
  },
  {
    name: 'strToLowerCase',
    type: 'string',
  },
  {
    name: 'strToUpperCase',
    type: 'string',
  },
  {
    name: 'strTrim',
    type: 'string',
  },
  {
    name: 'between',
    type: 'boolean',
  },
  {
    name: 'double2bool',
    type: 'boolean',
  },
  {
    name: 'in',
    type: 'boolean',
  },
  {
    name: 'parseBoolean',
    type: 'boolean',
  },
  {
    name: 'strEndsWith',
    type: 'boolean',
  },
  {
    name: 'strEqualsIgnoreCase',
    type: 'boolean',
  },
  {
    name: 'strMatches',
    type: 'boolean',
  },
  {
    name: 'strStartsWith',
    type: 'boolean',
  },
  {
    name: 'property',
    type: 'unknown',
    args: [{
      type: 'string',
      placeholder: '… the property name'
    }]
  }
];

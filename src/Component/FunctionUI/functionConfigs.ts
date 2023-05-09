/* eslint-disable max-len */
export const functionConfigs = [
  {
    name: 'abs',
    type: 'number',
    description: 'The absolute value of the specified number value',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'acos',
    type: 'number',
    description: 'Returns the arc cosine of an angle in radians, in the range of 0.0 through PI',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'asin',
    type: 'number',
    description: 'Returns the arc sine of an angle in radians, in the range of -PI / 2 through PI / 2',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'atan',
    type: 'number',
    description: 'Returns the arc tangent of an angle in radians, in the range of -PI/2 through PI/2',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'atan2',
    type: 'number',
    description: 'Converts a rectangular coordinate (x, y) to polar (r, theta) and returns theta',
    args: [{
      type: 'number',
      placeholder: '… enter x value'
    }, {
      type: 'number',
      placeholder: '… enter y value'
    }]
  },
  {
    name: 'ceil',
    type: 'number',
    description: 'Returns the smallest (closest to negative infinity) number value that is greater than or equal to x and is equal to a mathematical integer.',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'cos',
    type: 'number',
    description: 'Returns the cosine of an angle expressed in radians',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'exp',
    type: 'number',
    description: 'Returns Euler’s number e raised to the power of x',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'floor',
    type: 'number',
    description: 'Returns the largest (closest to positive infinity) value that is less than or equal to x and is equal to a mathematical integer',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'log',
    type: 'number',
    description: 'Returns the natural logarithm (base e) of x',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'max',
    type: 'number',
    description: 'Returns the maximum between argument[0], …, argument[n]',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }, {
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'min',
    type: 'number',
    // TODO: how to make infinite amount of inputs
    description: 'Returns the minimum between argument[0], …, argument[n]',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }, {
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'modulo',
    type: 'number',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }, {
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'pi',
    type: 'number',
    description: 'Returns an approximation of pi, the ratio of the circumference of a circle to its diameter'
  },
  {
    name: 'pow',
    type: 'number',
    description: 'Returns the value of base raised to the power of exponent',
    args: [{
      type: 'number',
      placeholder: '… enter base value'
    }, {
      type: 'number',
      placeholder: '… enter exponent value'
    }]
  },
  {
    name: 'random',
    type: 'number',
    description: 'Returns a Double value with a positive sign, greater than or equal to 0.0 and less than 1.0'
  },
  {
    name: 'rint',
    type: 'number',
    description: 'Returns the Double value that is closest in value to the argument and is equal to a mthematical integer. If two double values that are mathematical integers are equally close, the result is the integer value that is even.',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'round',
    type: 'number',
    description: 'Returns the closest integer number to the passed one.',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'sin',
    type: 'number',
    description: 'Returns the sine of an angle expressed in radians.',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'sqrt',
    type: 'number',
    description: 'Returns the square root',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'strIndexOf',
    type: 'number',
    description: 'Returns the index within a string of the first occurrence of the specified substring, or -1 if not found',
    args: [{
      type: 'string',
      placeholder: '… where to search'
    }, {
      type: 'string',
      placeholder: '… what to search'
    }]
  },
  {
    name: 'strLastIndexOf',
    type: 'number',
    description: 'Returns the index within a string of the last occurrence of the specified substring, or -1 if not found',
    args: [{
      type: 'string',
      placeholder: '… where to search'
    }, {
      type: 'string',
      placeholder: '… what to search'
    }]
  },
  {
    name: 'strLength',
    type: 'number',
    description: 'Returns the string length',
    args: [{
      type: 'string',
      placeholder: '… where to search'
    }]
  },
  {
    name: 'tan',
    type: 'number',
    description: 'Returns the trigonometric tangent of angle expressed in radians',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'toDegrees',
    type: 'number',
    description: 'Converts an angle expressed in radians into degrees',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'toRadians',
    type: 'number',
    description: 'Converts an angle expressed in degrees into radians',
    args: [{
      type: 'number',
      placeholder: '… enter angle'
    }]
  },
  {
    name: 'numberFormat',
    type: 'string',
    description: 'Formats the number according to the specified format (arguments[0]) using the default locale or the one provided (argument[2]) as an optional argument. The format syntax can be found in the Java DecimalFormat javadocs',
    args: [{
      type: 'string',
      placeholder: '… enter a number format as in JAVA DecimalFormat'
    }, {
      type: 'number',
      placeholder: '… enter the number to format'
    }, {
      type: 'string',
      placeholder: '… enter a locale'
    }]
  },
  {
    name: 'strAbbreviate',
    type: 'string',
    description: 'Abbreviates the sentence at first space beyond lower or at upper if no space.Appends append if string is abbreviated.',
    args: [{
      type: 'string',
      placeholder: '… enter a sentence'
    }, {
      type: 'number',
      placeholder: '… enter lower boundary index'
    }, {
      type: 'number',
      placeholder: '… enter upper boundary index'
    }, {
      type: 'string',
      placeholder: '… enter a string to append if abbreviated'
    }]
  },
  {
    name: 'strCapitalize',
    type: 'string',
    description: 'Fully capitalizes the sentence. For example, “HoW aRe YOU?” will be turned into “How Are You?”',
    args: [{
      type: 'string',
      placeholder: '… enter a sentence'
    }]
  },
  {
    name: 'strConcat',
    type: 'string',
    description: 'Concatenates the two strings into one',
    args: [{
      type: 'string',
      placeholder: '… first string'
    }, {
      type: 'string',
      placeholder: '… second string'
    }]
  },
  {
    name: 'strDefaultIfBlank',
    type: 'string',
    description: 'Returns default if string is empty, blank or null',
    args: [{
      type: 'string',
      placeholder: '… string to check'
    }, {
      type: 'string',
      placeholder: '… default value'
    }]
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
    description: 'Removes diacritics (~= accents) from a string. The case will not be altered',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'strSubstring',
    type: 'string',
    description: 'Returns a new string that is a substring of this string. The substring begins at the specified begin and extends to the character at index endIndex - 1 (indexes are zero-based).',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'number',
      placeholder: '… index of begining'
    }, {
      type: 'number',
      placeholder: '… index of ending'
    }]
  },
  {
    name: 'strSubstringStart',
    type: 'string',
    description: 'Returns a new string that is a substring of this string and extends to the last character of the string',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'number',
      placeholder: '… index of begining'
    }]
  },
  {
    name: 'strToLowerCase',
    type: 'string',
    description: 'Returns the lower case version of the string',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'strToUpperCase',
    type: 'string',
    description: 'Returns the upper case version of the string',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'strTrim',
    type: 'string',
    description: 'Returns a copy of the string, with leading and trailing blank-space omitted',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'between',
    type: 'boolean',
    description: 'Returns true if arg1 <= arg0 <= arg2',
    args: [{
      type: 'number',
      placeholder: '… enter a number to check'
    }, {
      type: 'number',
      placeholder: '… enter lower boundary'
    }, {
      type: 'number',
      placeholder: '… enter upper boundary'
    }]
  },
  {
    name: 'double2bool',
    type: 'boolean',
    description: 'Returns true if is zero, false otherwise',
    args: [{
      type: 'number',
      placeholder: '… enter a number'
    }]
  },
  {
    name: 'in',
    type: 'boolean',
    // TODO: how to make infinite amount of inputs
    description: 'Returns true if first argument is equal to one of the arguments[1], …, arguments[n] values. Use thefunction name matching the number of arguments specified.',
    args: [{
      type: 'string',
      placeholder: '… string to check'
    }, {
      type: 'string',
      placeholder: '… option 1'
    }, {
      type: 'string',
      placeholder: '… option 2'
    }, {
      type: 'string',
      placeholder: '… option 3'
    }]
  },
  {
    name: 'parseBoolean',
    type: 'boolean',
    description: 'Parses a string into a boolean. The empty string, f, 0.0 and 0 are considered false, everything else is considered true.',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'strEndsWith',
    type: 'boolean',
    description: 'Returns true if a string ends with suffix',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'string',
      placeholder: '… enter a suffix'
    }]
  },
  {
    name: 'strEqualsIgnoreCase',
    type: 'boolean',
    description: 'Returns true if the two strings are equal ignoring case considerations',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'string',
      placeholder: '… enter a string'
    }]
  },
  {
    name: 'strMatches',
    type: 'boolean',
    description: 'Returns true if the string matches the specified regular expression For the full syntax of the pattern specification see the Java Pattern class javadocs',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'string',
      placeholder: '… enter a regular expression'
    }]
  },
  {
    name: 'strStartsWith',
    type: 'boolean',
    description: 'Returns true if string starts with prefix',
    args: [{
      type: 'string',
      placeholder: '… enter a string'
    }, {
      type: 'string',
      placeholder: '… enter a prefix'
    }]
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

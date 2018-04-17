/**
 * Operators can be used for any comparison operation. The main set comes from:
 * https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-decision
 * and is extended with some more.
 *
 */
type Operator =
 '!' | // Not
 '==' | // Equal
 '*=' | // Like (not included in MapBox expression decisions)
 '!=' | // NotEqual
 '<' | // Less
 '<=' | // LessOrEqual
 '>' | // Greater
 '>=' | // GreaterOrEqual
 '&&' | // All/And
 '||'; // Any/Or

export default Operator;

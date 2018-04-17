import SchemaProperty from './SchemaProperty';

/**
 * Class represents the properties of an object according to JSON schema.
 * Like:
 * 
 *   {
 *     "firstName": {
 *       "type": "string"
 *     },
 *     "lastName": {
 *       "type": "string"
 *     },
 *     "age": {
 *       "description": "Age in years",
 *       "type": "integer",
 *       "minimum": 0
 *     }
 *   }
 *   
 *
 * @class SchemaProperties
 */
interface SchemaProperties {

  [key: string]: SchemaProperty;
}

export default SchemaProperties;

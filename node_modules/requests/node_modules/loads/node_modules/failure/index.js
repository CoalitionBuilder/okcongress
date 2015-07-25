'use strict';

/**
 * Return an object with all the information that should be in the JSON output.
 * It doesn't matter if we list keys that might not be in the err as the
 * JSON.stringify will remove properties who's values are set to `undefined`. So
 * we want to make sure that we include some common properties.
 *
 * @returns {Object}
 * @api public
 */
function toJSON() {
  return {
    statusCode: this.statusCode,
    message: this.message,
    stack: this.stack,
    type: this.type
  };
}

/**
 * Generate a custom wrapped error object.
 *
 * @param {String|Error} err Error that needs to have additional properties.
 * @param {Object} props Addition properties for the Error.
 * @returns {Error} The generated or returned Error instance
 * @api public
 */
module.exports = function failure(err, props) {
  if (!err) err = 'Unspecified error';
  if ('string' === typeof err) err = new Error(err);

  if (props) for (var prop in props) {
    if (!(prop in err) && props.hasOwnProperty(prop)) {
      err[prop] = props[prop];
    }
  }

  //
  // Add a custom `toJSON` method so we can generate a useful output when
  // running these objects through JSON.stringify.
  //
  if ('function' !== typeof err.toJSON) err.toJSON = toJSON;
  return err;
};

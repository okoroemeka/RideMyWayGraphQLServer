/**
 * @returns {null}
 * @param {object} fields
 */
const checkInputFields = fields => {
  const data = Object.keys(fields);
  let emptyFields = [];
  data.forEach(element => {
    if (!fields[element].length && typeof fields[element] !== 'number') {
      emptyFields.push(element);
    }
  });
  if (emptyFields.length) {
    throw new Error(
      `The ${emptyFields.join()} field${emptyFields.length > 1 ? 's' : ''} ${
        emptyFields.length > 1 ? 'are' : 'is'
      } empty`
    );
  }
  return null;
};
export default checkInputFields;

/**
 * checks if a user is signed in
 * @param {object} context
 */
const userAuth = context => {
  const { userId } = context.request;
  if (!userId) throw new Error('Please login to continue');
};
export default userAuth;

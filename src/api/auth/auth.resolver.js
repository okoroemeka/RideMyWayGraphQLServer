import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkFields from '../../utils/checkFields';

/**
 *
 * @param {object} userdatails
 * @param {object} ctx
 */
const createUserHelper = async (
  { input: { firstname, lastname, email, phone, password, confirmPassword } },
  ctx
) => {
  const checkUser = await ctx.models.users.findOne({
    where: {
      email
    }
  });

  console.log('checkUser', checkUser);
  if (checkUser)
    throw new Error('User already exist, please signin to continue.');

  if (password !== confirmPassword)
    throw new Error('Password do match, check them to confirm');

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await ctx.models.users.create({
    firstname,
    lastname,
    email,
    phone,
    password: hashPassword
  });
  // Create token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.APP_SECRET
  );
  //Add token to ccokie
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  const userInfo = { firstname, lastname, email, phone };
  return userInfo;
};

/**
 * @param {*} _
 * @param {object} args
 * @param {object} ctx
 * @param {object} info
 * @returns {object} user
 */
const createUser = (_, args, ctx, info) => {
  return createUserHelper(args, ctx);
};

/**
 *
 * @param {object} args
 * @param {object} ctx
 * @returns {object} dataValues
 */
const signInHelper = async (args, ctx) => {
  checkFields(args.input);
  const { input:{email, password }} = args;
  const { models } = ctx;
  const user = await models.users.findOne({
    where: {
      email
    }
  });
  if (!user) throw new Error('The user does not exist, please signup');

  const { dataValues } = user;
  const valid = await bcrypt.compare(password, dataValues.password);
  if (!valid) throw new Error('Wrong email or password');

  const token = jwt.sign(
    { userId: dataValues.id, email: dataValues.email },
    process.env.APP_SECRET
  );

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  return dataValues;
};
/**
 *
 * @param {*} _
 * @param {object} args
 * @param {object} ctx
 * @param {object} info
 */
const signIn = (_, args, ctx, info) => {
  return signInHelper(args, ctx);
};

export default {
  Mutation: {
    createUser,
    signIn
  }
};

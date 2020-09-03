import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const createResource = async (req, res, next) => {
  const {
    firstname,
    lastname,
    gender,
    date_of_birth,
    username,
    password,
  } = req.body.users;
  try {
    const checkUser = await models.User.findOne({ where: { username } });
    if (checkUser) return errorStat(res, 409, "User Already Exist");

    const user = await models.User.create({
      firstname,
      lastname,
      gender,
      date_of_birth,
      username,
      password,
    });
    return successStat(res, 201, "Data", { ...user.userResponse() });
  } catch (error) {
    next(error);
  }
};
/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const getResource = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkUser = await models.User.findOne({ where: { id } });
    if (!checkUser) return errorStat(res, 404, "User does not exist");
    return successStat(res, 200, "Data", { ...checkUser.userResponse() });
  } catch (error) {
    next(error);
  }
};

/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const updateResource = async (req, res, next) => {
  const { userId, id, firstname, lastname, gender, date_of_birth } = req.body;
  try {
    const checkUser = await models.User.findOne({ where: { id: userId } });
    if (!checkUser) return errorStat(res, 404, "User does not exist");
    const updatedUser = await checkUser.update(
      {
        id,
        firstname,
        lastname,
        gender,
        date_of_birth,
      },
      { where: { id: userId } }
    );
    return successStat(res, 200, "Data", { ...updatedUser.userResponse() });
  } catch (error) {
    next(error);
  }
};

/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const deleteResource = async (req, res, next) => {
  const { id } = req.body.user;
  try {
    const checkUser = await models.User.findOne({ where: { id } });
    if (!checkUser) return errorStat(res, 404, "User does not exist");
    await checkUser.destroy({ where: { id } });
    return successStat(res, 200, "Data", "");
  } catch (error) {
    next(error);
  }
};

/**
 * / @static
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @returns {Object} object containing user data and access Token
 * @memberof UserController
 */
export const getAllResource = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length >= 1) {
      const { filter_field, filter_value } = req.query;
      const getUser = await models.User.findAll(
        { where: { [filter_field]: filter_value } },
        { limit: 25 },
        { order: ["id", "DESC"] }
      );
      if (!getUser) return errorStat(res, 404, "Users does not exist");
      return successStat(res, 200, "Data", getUser.map(user => user.userResponse()));
    }
    const getUser = await models.User.findAll(
      { limit: 25 },
      { order: ["id", "DESC"] }
    );
    if (!getUser) return errorStat(res, 404, "Users does not exist");

    return successStat(res, 200, "Data", getUser.map(user => user.userResponse()));
  } catch (error) {
    next(error);
  }
};

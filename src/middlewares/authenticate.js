import createHttpError from 'http-errors';
import { SessionsCollections } from '../db/models/session.js';
import { UsersCollections } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const token = req.cookies.sessionId;

  if (!token) {
    return next(createHttpError(401, 'Access token is missing'));
  }

  const session = await SessionsCollections.findOne({ token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await UsersCollections.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;
  next();
};

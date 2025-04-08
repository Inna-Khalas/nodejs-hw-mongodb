import { FIFTEEN_MINUTES, ONE_MOUNTH } from '../constants/index.js';

const options = {
  httpOnly: true,
  expires: new Date(Date.now() + ONE_MOUNTH),
};

export const setUpSession = (res, session) => {
  res.cookie('sessionId', session._id, options);
  res.cookie('refreshToken', session.refreshToken, options);
  res.cookie('accessToken', session.accessToken, {
    ...options,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
};

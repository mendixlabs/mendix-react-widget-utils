import { getObject } from "./objects";

/**
 * Returns whether or not a user is logged in
 *
 * @name isGuest
 * @category User
 */
export const isGuest = () => window.mx.session.isGuest && window.mx.session.isGuest();

/**
 * Returns a User ID
 *
 * @name getUserId
 * @category User
 */
export const getUserId = () => window.mx.session.getUserId && window.mx.session.getUserId();

/**
 * Get User object (if user is logged in and known)
 *
 * @name getUserObject
 * @category User
 */
export const getUserObject = async () => {
    const userID = getUserId();
    const user = userID ? await getObject(userID) : null;
    return user;
};

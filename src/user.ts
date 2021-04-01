import { getObject } from "./objects";

/**
 * Returns whether or not a user is logged in
 *
 * @name isGuest
 * @category User
 */
export const isGuest = () => (window.mx.session.isGuest ? window.mx.session.isGuest() : null);

/**
 * Returns a User ID
 *
 * @name getUserId
 * @category User
 */
export const getUserId = () => (window.mx.session.getUserId ? window.mx.session.getUserId() : null);

/**
 * Get User object (if user is logged in and known)
 *
 * @name getUserObject
 * @category User
 */
export const getUserObject = () => {
    const userID = getUserId();
    return userID ? getObject(userID) : Promise.resolve(null);
};

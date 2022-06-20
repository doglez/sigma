/**
 * @name AsyncHandler
 * @description Asynchronous function, receives a function and returns a promise (try/catch)
 * @param {*} fn
 * @returns Promise
 */
const AsyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default AsyncHandler;

import * as http from './Http'

const PREFIX = 'film'

/**
 * @return {Promise} mixed Promise
 */
export const _list = () => http
    .get(`${PREFIX}`)
    .then(res => res.body)

/**
 * @param {String} Slug
 * @return {Promise} mixed Promise
 */
export const _show = slug => http
    .get(`${PREFIX}/${slug}`)
    .then(res => res.body)

/**
 * @param {Integer} id
 * @param {Object} comment
 * @return {Promise} mixed Promise
 */
export const _comment = (film, comment) => http
    .post(`${PREFIX}/comment/${film}`, comment)
    .then(res => res.body)

/**
 * @param {Integer} id
 * @param {Object} rating
 * @return {Promise} mixed Promise
 */
export const _rating = (id, rating) => http
    .post(`${PREFIX}/rating/${id}`, rating)
    .then(res => res.body)

/**
 * @return {Promise} mixed Promise
 */
export const _prerequisite = () => http
    .get(`${PREFIX}/create/prerequisite`)
    .then(res => res.body)

/**
 * @return {Promise} mixed Promise
 */
export const _create = film => http
    .post(`${PREFIX}`, film)
    .then(res => res.body)

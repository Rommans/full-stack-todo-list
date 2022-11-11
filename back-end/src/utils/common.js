import _ from "lodash";

/**
 * Extract token from header
 * @param authHeader
 */
export function getToken(authHeader) {
  const data = authHeader.split("Bearer ");

  return _.get(data, "[1]", "");
}

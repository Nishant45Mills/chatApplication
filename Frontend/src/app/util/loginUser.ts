export const getCurrentUser = (loginUser: any, user: any) => {
  return loginUser == user?.[0]['_id'] ? user?.[1]['name'] : user?.[0]['name'];
};

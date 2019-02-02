import axios from "axios";

/**
 * @description methods for interacting with API Auth routes
 */
export default {
  getPosts: () => axios.get("/post/post"),
  //searchHome:(chosen) => axios.get(`/post/search/${chosen}`),
  login: userData => axios.post("/auth/login",  userData),
  signUp: userData => axios.post('/auth/signup', userData),
  dashboard: token => axios.get('/api/dashboard', {headers: {Authorization: `bearer ${token}`}}),
  searchd: (token, identifier) => axios.get(`/api/search/${identifier}`, {headers: {Authorization: `bearer ${token}`}}),
  // searchf: () => axios.get('/search/identifier'),
  addPosts:(token, postData)  => axios.post('/api/addPost', postData, {headers: {Authorization: `bearer ${token}`}}),
  signUpm: (token,userData) => axios.post('/api/signup', userData,{headers: {'Authorization': `bearer ${token}`}}),
  updatePortfolio:(token,userData) => axios.put('/api/update', userData,{headers: {'Authorization': `bearer ${token}`}}),
  updatePost:(token,postData) => axios.put('/api/updatepost', postData,{headers: {'Authorization': `bearer ${token}`}}),
  removePost:(token, id) => axios.delete(`/api/deletepost/${id}`,{headers: {'Authorization': `bearer ${token}`}}),
  removeUser:(token, id) => axios.delete(`/api/delete/${id}`,{headers: {'Authorization': `bearer ${token}`}}),
};

import axios from "axios";

/**
 * @description methods for interacting with API Auth routes
 */
export default {
  getPosts: () => axios.get("/post/post"),
  searchHome:(chosen) => axios.get(`/post/search/${chosen}`),
  login: userData => axios.post("/auth/login",  userData),
  signUp: userData => axios.post('/auth/signup', userData),
  dashboard: token => axios.get('/api/dashboard', {headers: {Authorization: `bearer ${token}`}}),
//   uploadImage: (token,imageData) => axios.post('/api/uploadimage', imageData, {headers: {Authorization: `bearer ${token}`, 'Content-Type': 'multipart/form-data'}}),
  searchd: (token, identifier) => axios.get(`/api/search/${identifier}`, {headers: {Authorization: `bearer ${token}`}}),
  searchf: () => axios.get('/search/identifier'),
  addPosts:(token, postData)  => axios.post('/api/addPost', postData, {headers: {Authorization: `bearer ${token}`}}),

  signUpm: (token,userData) => {
   console.log(userData);
   return axios.post('/api/signup', userData,
      {
         headers: {
            'Authorization': `bearer ${token}`
         }
      }
   )
},


};

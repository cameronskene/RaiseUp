import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  formatQueryString(params) {
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // console.log("querystring in api.js, ", queryString)
    return queryString
  },
  getCampaignsByQuery(params) {
    let queryString = this.formatQueryString(params)
    return service
      .get(`/campaigns/search/?${queryString}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  getCharities() {
    return service
      .get('/charities')
      .then(res => res.data)
      .catch(errHandler);
  },
  getCharity(charid) {
    return service
      .get(`/charities/${charid}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  postCharities(data) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });
    return service
      .post('/charities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  getCampaign(charid, campid) {
    return service
      .get(`/charities/${charid}/campaigns/${campid}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  postCampaigns(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });
    return service
      .post(`/charities/${data._charity}/campaigns/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);


    // return service
    //   .post(`/charities/${data._charity}/campaigns/add`, data)
    //   .then(res => { console.log("res.data in api.js: ", res.data);
    //     return res.data})
    //   .catch(errHandler);
  },

  getMaterial(charid, campid, mateid) {
    console.log("getMaterial api.js method, charid: ", charid)
    return service
      .get(`/charities/${charid}/campaigns/${campid}/materials/${mateid}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  postMaterials(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });

    return service
      .post(`/charities/${data._charity}/campaigns/${data._campaign}/materials/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);

    // return service
    //   .post(`/charities/${data._charity}/campaigns/${data._campaign}/materials/add`, data)
    //   .then(res => { res.data })
    //   .catch(errHandler);
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },
};

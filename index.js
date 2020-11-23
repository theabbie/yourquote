var axios = require("axios");
var fd = require("form-data");

module.exports = class YourQuote {
  constructor() {
    this.root = 'https://www.yourquote.in/api';
  }

  async login(username,password) {
    this.username = username;
    this.password = password;
    var token = await axios({
      url: this.root + '/auth/login/password/',
      method: 'POST',
      data: {
        "user_query": this.username,
        "password": this.password
      }
    });
    this.token = token.data.auth.token;
    return this.token;
  }

  async addToken(token) {
    this.token = token;
  }

  async profile() {
    var profile = await axios({
      url: this.root + '/auth/profile/',
      headers: {
         Authorization: 'Token ' + this.token
      }
    });
    return profile.data;
  }

  async post(quote) {
    var data = new fd();
    
    var result = await axios({
      url: this.token + '/posts/post/create/',
      method: 'POST',
      data: data,
      headers: {
        Authorization: 'Token ' + this.token,
        ...data.getHeaders()
      }
    });
    return result.data;
  }
}

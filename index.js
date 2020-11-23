var axios = require("axios");

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
    this.token = token.auth.token;
    return this.token;
  }
}

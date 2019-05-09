import API from './API';

class TypeformAPI extends API {
  constructor() {
    super();
    this.BASE_URL = 'https://api.typeform.com/';
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM_ACCESS_TOKEN}`
    };
  }

  getApplications = () => fetch(`${this.BASE_URL}/forms/HPSHZt/responses?page_size=1000`, this.getOptions('get'))
    .then(this.handleResponse);
}

export default TypeformAPI;

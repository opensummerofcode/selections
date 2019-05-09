import API from './API';

class TypeformAPI extends API {
  constructor() {
    super();
    this.BASE_URL = 'https://api.typeform.com/';
  }
}

export default TypeformAPI;

import axios from 'axios';

const transferwise = axios.create({
  baseURL: process.env.TRANSFERWISE_SANDBOX_URL,
  headers: {
    Authorization: process.env.TRANSFERWISE_SANDBOX_KEY
  }
});

export default {
  async getBalance() {
    return await transferwise
      .get('borderless-accounts', {
        params: {
          // TODO GET PROFILE ID
          profileId: process.env.TRANSFERWISE_PROFILE_ID
        }
      })
      .then(response => {
        return response.data;
      });
  }
};

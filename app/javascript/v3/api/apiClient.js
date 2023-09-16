import axios from 'axios';

const { apiHost = '' } = window.clientx.onfig || {};
const wootAPI = axios.create({ baseURL: `${apiHost}/` });

export default wootAPI;

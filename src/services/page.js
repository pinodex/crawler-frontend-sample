import axios from '@/services/axios';

const all = async () => {
  const { data } = await axios.get('/pages');

  return data;
};

const get = async (id) => {
  const { data } = await axios.get(`/pages/${id}`);

  return data;
};

const create = async (url) => {
  const { data } = await axios.post('/pages', { url });

  return data;
};

export default {
  all,
  get,
  create,
};

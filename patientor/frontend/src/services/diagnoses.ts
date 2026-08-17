import axios from 'axios';
import type { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${id}`);

  return data;
};

export default {
  getAll,
  getOne,
};

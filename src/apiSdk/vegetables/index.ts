import axios from 'axios';
import queryString from 'query-string';
import { VegetableInterface, VegetableGetQueryInterface } from 'interfaces/vegetable';
import { GetQueryInterface } from '../../interfaces';

export const getVegetables = async (query?: VegetableGetQueryInterface) => {
  const response = await axios.get(`/api/vegetables${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVegetable = async (vegetable: VegetableInterface) => {
  const response = await axios.post('/api/vegetables', vegetable);
  return response.data;
};

export const updateVegetableById = async (id: string, vegetable: VegetableInterface) => {
  const response = await axios.put(`/api/vegetables/${id}`, vegetable);
  return response.data;
};

export const getVegetableById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vegetables/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVegetableById = async (id: string) => {
  const response = await axios.delete(`/api/vegetables/${id}`);
  return response.data;
};

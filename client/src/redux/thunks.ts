import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from 'axios';
import { ServiceTypes, ServicesType, userType } from "../types/types";

export const fetchAddUser = createAsyncThunk(
  "user/create",
  async (user: userType) => { 
    const response: AxiosResponse<userType> = await axios.post(
      `${import.meta.env.VITE_URL}/api/register`,
      user
    );
    return response.data;
  } 
);

export const fetchGetServices = createAsyncThunk('services/all', async ()=>{
  const response = await axios.get<ServicesType>(
    `${import.meta.env.VITE_URL}/services`
  );
  return response.data
})

export const fetchPageService = createAsyncThunk(
  "service/page",
  async (id: string) => {
    const response = await axios.get<ServiceTypes>(
      `${import.meta.env.VITE_URL}/services/${id}`
    );
    return response.data;
  }
);

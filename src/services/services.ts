import axios, { AxiosResponse } from 'axios';

const baseUrl = 'https://challenge.crossmint.io/api';
const id = 'bd172cb4-14fa-4441-90a8-901ce2dadf26';

export type PositionTypes = {
  row:number,
  column:number
}

export type SoloonsTypes = {
  color: string
}

export type ComethTypes = {
  direction: string
}

export type MegaverseTypes = ComethTypes | SoloonsTypes | PositionTypes

async function getGoalMap() {
    try {
      const response = await axios.get(`${baseUrl}/map/${id}/goal`);
      return response.data
    } catch (error) {
      console.error(error);
      return 'Something went wrong'
    }
  }
  
  
async function postPolyanets({row,column}:PositionTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${baseUrl}/polyanets`, {
      candidateId:id,
      row,
      column,
    });
      console.log(response);
  } catch (error) {
      console.error(error);
  }
  };

async function postSoloons({row,column,color}:PositionTypes & SoloonsTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${baseUrl}/soloons`, {
      candidateId:id,
      row,
      column,
      color,
    });
      console.log(response);
  } catch (error) {
      console.error(error);
  }
  };

async function postCometh({row,column,direction}:PositionTypes & ComethTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${baseUrl}/comeths`, {
      candidateId:id,
      row,
      column,
      direction,
    });
      console.log(response);
  } catch (error) {
      console.error(error);
  }
  };

async function deleteSoloons({row, column}:PositionTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.delete<void>(`${baseUrl}/soloons`, {
      data: {
        candidateId:id,
        row:row,
        column:column,
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

async function deletePolyanets({row, column}:PositionTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.delete<void>(`${baseUrl}/polyanets`, {
      data: {
        candidateId:id,
        row:row,
        column:column,
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

async function deleteCometh({row, column}: PositionTypes): Promise<void> {
  try {
    const response: AxiosResponse<void> = await axios.delete<void>(`${baseUrl}/comeths`, {
      data: {
        candidateId:id,
        row:row,
        column:column,
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

export { getGoalMap, postPolyanets, postSoloons, postCometh, deleteSoloons, deleteCometh, deletePolyanets };
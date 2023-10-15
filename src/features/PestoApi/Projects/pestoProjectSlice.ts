import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import axios from "axios"

const API_PORT = "3000"
const API_HOST = "localhost"
const API_BASE_URL = `http://${API_HOST}:${API_PORT}`

// TYPES POUR LA REQUETE AXIOS
type ApiHeader = {
  Accept: string
  "Content-Type": string
}
export enum urls { // STRICT URLS/HOOKS
  PESTOPROJECT = `${API_BASE_URL}/pesto-project`,
  PESTOCONTENT = `${API_BASE_URL}/pesto-content`,
  PESTOCONTENTTYPE = `${API_BASE_URL}/pesto-content-type`,
  PESTOPROJECTNAME = `${API_BASE_URL}/pesto-project/name`,
  PESTOPROJECTURI = `${API_BASE_URL}/pesto-project/uri`,
  PESTOCONTENTTYPEPROJECT = `${API_BASE_URL}/pesto-content-type/project`,
}
export enum methods { // STRICT METHODS
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}
// PESTO DATA TYPES
export type PestoProjectApiEntity = {
  _id?: number
  name: string
  git_ssh_uri: string
  description: string
  title?: string
  createdAt?: string
  identifier?: string
  __v?: number
}
// AXIOS REQUEST READY
export type AxiosRequest = {
  baseURL: urls
  url?: string
  method: methods
  data?: PestoProjectApiEntity
  headers?: ApiHeader
}

// PESTO REQUEST STATE
interface PestoApiRequestState {
  value?: PestoProjectApiEntity[]
  status: "idle" | "loading" | "failed"
  feedbacks: string[]
}

const initialState: PestoApiRequestState = {
  value: [],
  status: "idle",
  feedbacks: [],
}

const ERROR_FEEDBACK: PestoApiRequestState = {
  status: "failed",
  feedbacks: [],
}

const requestPestoApiAsync = createAsyncThunk(
  "pestoApi/request",
  async (req: AxiosRequest): Promise<PestoApiRequestState> => {
    try {
      const { data } = await axios<PestoProjectApiEntity[]>(req)

      return {
        value: data,
        status: "loading",
        feedbacks: ["succes: " + req.method + " " + (req.url ? req.url : "")],
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ERROR_FEEDBACK.feedbacks.splice(0, 0, "Axios Error: " + error.message)
        return ERROR_FEEDBACK
      } else {
        ERROR_FEEDBACK.feedbacks.splice(0, 0, "Unexpected error: " + error)
        return ERROR_FEEDBACK
      }
    }
  },
)

// EVERY CRUD PROJECTS REQUEST IN AXIOS FORMAT
export const API_LIST_ALL_ENTITY: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.GET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_CREATE_CONTENT_TYPE: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.POST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_UPDATE_FROM_PROJECT_BY_ID: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.PUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_DELETE_ENTITY_BY_ID: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.DELETE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

/**
 * --------------------------------------------------------------
 *                   METHODS FOR YOUR PAGES
 *  --------------------------------------------------------------
 */

/**
 * FUNCTION TO CREATE A NEW PROJECT
 *
 *  use: `< ... onclick={dispatch(CreateProject(data))}>`
 * @param data (PestoProjectApiEntity)
 * @returns request to api
 */
export const CreateProject = (data: PestoProjectApiEntity) => {
  API_CREATE_CONTENT_TYPE.data = data
  return requestPestoApiAsync(API_CREATE_CONTENT_TYPE)
}
/**
 * FUNCTION TO REQUEST PROJECT LIST
 *
 *  use: `< ... onClick={() => dispatch(RequestProjectList())}>`
 * @returns [json] (PestoProjectApiEntity[])
 */
export const RequestProjectList = () => {
  return requestPestoApiAsync(API_LIST_ALL_ENTITY)
}
/**
 * FONCTION UPDATE PROJECT
 *
 *  use: `< ... onClick={() => dispatch(UpdateProjectById(data))}>`
 * @param data (PestoProjectApiEntity)
 * @returns void
 */
export const UpdateProjectById = (data: PestoProjectApiEntity) => {
  console.log(data)
  API_UPDATE_FROM_PROJECT_BY_ID.url = "/" + data._id
  API_UPDATE_FROM_PROJECT_BY_ID.data = data
  return requestPestoApiAsync(API_UPDATE_FROM_PROJECT_BY_ID)
}
/**
 * FUNCTION DELETE PROJECT
 *
 *  use: `< ... onClick={() => dispatch(DeleteProjectById(item._id))}>`
 * @param id (string)
 * @returns void
 */
export const DeleteProjectById = (id: string) => {
  API_DELETE_ENTITY_BY_ID.url = "/" + id
  return requestPestoApiAsync(API_DELETE_ENTITY_BY_ID)
}

/*
  PESTO REDUCERS
  
  A function that accepts an initial state, 
  an object full of reducer functions, 
  and a "slice name", and automatically generates action creators and 
  action types that correspond to the reducers and state.

  The reducer argument is passed to createReducer().
 */
const pestoProjectSlice = createSlice({
  name: "pestoProject",
  initialState,
  reducers: {
    /* EMPTY */
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPestoApiAsync.pending, (state) => {
        state.status = "loading"
        console.log(" PESTO REDUCER requestPestoApiAsync loading")
      })
      .addCase(requestPestoApiAsync.fulfilled, (state, action) => {
        state.status = "idle"
        console.log(" PESTO REDUCER fetch fulfilled, payload: ", action.payload)
        state.value = action.payload.value
        state.feedbacks.splice(0, 0, action.payload.feedbacks[0])
      })
      .addCase(requestPestoApiAsync.rejected, (state) => {
        state.status = "failed"
        state.feedbacks.splice(0, 0, "rejected")
        console.log(" PESTO REDUCER requestPestoApiAsync failed")
      })
  },
})

/**
 *  YOUR STORE FOR ANY PAGES
 *
 *  use:  `const maVar = useAppSelector(ROOSTATE VAR)`
 */
/**
 * REQUEST FEEDBACKS STORE
 *
 *  use:  `const maVar = useAppSelector(request_Feedback)`
 * @param state
 * @returns (string[])
 */
export const request_Feedback = (state: RootState) =>
  state.pestoProject.feedbacks
/**
 * REQUEST VALUE STORE
 *
 *  use:  `const maVar = useAppSelector(request_Output)`
 * @param state
 * @returns json (PestoProjectApiEntity)
 */
export const request_Output = (state: RootState) => state.pestoProject.value

export default pestoProjectSlice.reducer

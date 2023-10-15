import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import pestoProjectReducer from "../features/PestoApi/Projects/pestoProjectSlice"

export const store = configureStore({
  reducer: {
    pestoProject: pestoProjectReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

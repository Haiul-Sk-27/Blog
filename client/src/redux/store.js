import { configureStore } from "@reduxjs/toolkit"
import authSlice from  './authSlice'
import themeSlice from './themeSlice'
import blogSlice from "./blogSlice"

const store = configureStore({
    reducer:{
        auth:authSlice,
        theme:themeSlice,
        blog:blogSlice
    }
})

export default store
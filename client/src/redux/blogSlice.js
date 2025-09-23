import {createSlice} from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name:"blog",
    initialState:{
        blog:null,
        yourBlog:null
    },
    reducers:{
        //actions
        setBlog:(state, action) => {
            state.blog = action.payload;
            
        },
        setYourBlog:(state, action) => {
            console.log("Blog_Action",action.payload)
            state.yourBlog = action.payload;
        }

    }
});

export const {setBlog, setYourBlog} = blogSlice.actions;
export default blogSlice.reducer;
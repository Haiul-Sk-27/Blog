import { setBlog } from '@/redux/blogSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCardList from './BlogCardList';

const RecentBlog = () => {
    const dispatch = useDispatch();
    const { blog } = useSelector(store => store.blog)

    useEffect(() => {
        const getAllPublsihedBlogs = async () => {
            try {

                const res = await axios.get(`https://blog-uv51.onrender.com/api/v1/blog/get-published-blogs`, { withCredentials: true })

                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getAllPublsihedBlogs();
    }, [])
    return (
        <div className='bg-gray-100 dark:bg-gray-800 pb-10'>
            <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold pt-10'>Recent Blog</h1>
                <hr className='w-24 text-center border-2 border-red-500 rounded-full' />
            </div>

            <div className='max-w-7xl mx-auto flex gap-6'>
                <div>
                    <div className='mt-10 px-4 md:px-0'>
                         {
                            blog?.slice(0, 4)?.map((blog, index) => {
                                return <BlogCardList key={index} blog={blog} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog
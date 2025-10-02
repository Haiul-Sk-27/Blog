import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const navigate = useNavigate()
    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleDateString("en-GB");
    return (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-transform duration-300 ease-in-out w-80 h-[420px] flex flex-col">
            <img src={blog.thumbnail} alt="" className="rounded-lg w-full h-48 object-cover"/>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                By {blog?.author?.firstName} | {blog?.category } | {formattedDate}
            </p>

            <h2 className="text-md font-semibold  mt-1 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid nam, id odio itaque, sed, maiores unde ipsam reprehenderit ut ullam molestias sit distinctio quia fugiat animi qui debitis iste.</h2>
            <h3 className='text-sm text-gray-500 mt-1'>{blog.subtitle}</h3>
            {/* <p className=" mt-3">{blog.description.substring(0, 100)}...</p> */}
            {/* <div className="mt-3 flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                        {tag}
                    </span>
                ))}
            </div> */}
            <Button onClick={() => navigate(`/blogs/${blog._id}`)} className="mt-auto mb-[2px] px-4 py-2 rounded-lg text-sm text-white">
                Read More
            </Button>
        </div>
    )
}

export default BlogCard
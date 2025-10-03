import Hero from '@/components/Hero'
import PopularAuthors from '@/components/PopularAuthors'
import RecentBlog from '@/components/RecentBlog'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Hero/>
        <RecentBlog/>
        <PopularAuthors/>
    </div>
  )
}

export default Home
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import { FaRegHeart } from 'react-icons/fa';
import { Bookmark, MessageSquare } from 'lucide-react';
import { Share2 } from 'lucide-react';

const BlogView = () => {
    const params = useParams();
    const blogId = params.blogId;
    console.log("blogIDb", blogId);
    const { blog } = useSelector(store => store.blog);
    console.log("blog", blog)
    const selectedBlog = blog.find(blog => blog._id == blogId)
    console.log("Author:", selectedBlog.author)

    const changeTimeFormat = (isDate) => {
        const date = new Date(isDate);
        const options = { day: "numeric", month: "long", year: "numeric" }
        const formatedDate = date.toLocaleString('en-GB', options)
        return formatedDate;
    }

    const handleShare = (blogId) => {
        const blogUrl = `${window.location.origin}/blogs/${blogId}`;

        if (navigator.share) {
            navigator
                .share({
                    title: 'Check out this blog!',
                    text: 'Read this amazing blog post.',
                    url: blogUrl,
                })
                .then(() => console.log('Shared successfully'))
                .catch((err) => console.error('Error sharing:', err));
        } else {
            // fallback: copy to clipboard
            navigator.clipboard.writeText(blogUrl).then(() => {
                toast.success('Blog link copied to clipboard!');
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='p-14'>
            <div className='max-w-5xl mx-auto p-10'>
                <Breadcrumb >
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/docs/components">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/*Blog header*/}
                <div className='my-8'>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{selectedBlog.title}</h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={selectedBlog.author.photoUrl} alt="autor" />
                                <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-medium'>{selectedBlog.author.firstName} {selectedBlog.author.lastName}</p>
                                <p className='text-sm text-muted-foreground'>{selectedBlog.author.occupation || "Undifined"}</p>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Published on {changeTimeFormat(selectedBlog.createdAt)} • 8 min read</div>
                    </div>
                </div>

                <div className='mb-8 rounded-lg overflow-hidden'>
                    <img src={selectedBlog.thumbnail} alt="Blog Thumbnail" className='w-full h-90 object-cover rounded-lg' />
                    <p className='text-sm text-muted-foreground mt-2 italic'>{selectedBlog.subtitle}</p>
                </div>

                <p className='' dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
                <div className='mt-10'>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Web Development</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                    </div>
                    {/*angament */}
                    <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
                        <div className='flex items-center space-x-4'>
                            <Button className="flex items-center gap-1"><FaRegHeart size={24} className='cursor-pointer hover:text-gray-600' /><span>0</span></Button>
                            <Button>
                                <MessageSquare className='h-4 w-4' />
                                <span>1 Comments</span>

                            </Button>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Button variant="ghost" size="sm">
                                <Bookmark className='w-4 h-4' />
                            </Button>
                            <Button onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                {/*<CommentBox selectedBlog={selectedBlog} />*/}
            </div>
        </div>
    )
}

export default BlogView
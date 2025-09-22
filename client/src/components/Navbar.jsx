import React from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, Search, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa';
import { AvatarImage, AvatarFallback, Avatar } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from "@/redux/authSlice";
import { toggleTheme } from '@/redux/themeSlice'
import { LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiaCommentSolid } from "react-icons/lia";
import { FaRegEdit } from "react-icons/fa";

const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const { theme } = useSelector(store => store.theme)
    const dispatch = useDispatch()

    const logoutHandler = async (e) => {
        console.log("Logout initiated");

        try {
            const res = await axios.post(`http://localhost:3000/api/v1/user/logout`, {
                withCredentials: true,
            });

            if (res?.data?.success) {
                dispatch(setUser(null));
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message || "Logout failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "server Error")
        }
    };

    return (
        <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                {/*logo section*/}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}>
                        <div className='flex gap-2 items-center'>
                            <img src={logo} alt='' className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                            <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
                        </div>
                    </Link>

                    <div className='relative hidden md:block'>
                        <Input type="text" placeholder="search.." className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block" />
                        <Button className='absolute right-0 top-0'><Search /></Button>
                    </div>
                </div>

                {/*Nav section*/}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
                        <NavLink to={'/'} className="cursor-pointer"><li>Home</li></NavLink>
                        <NavLink to={'/blogs'} className={`cursor-pointer`}><li>Blogs</li></NavLink>
                        <NavLink to={'/about'} className={`cursor-pointer`}><li>About</li></NavLink>
                    </ul>

                    <div className='flex'>
                        <Button onClick={() => dispatch(toggleTheme())} className="">
                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }

                        </Button>

                        {
                            user ? <div className='ml-7 flex gap-3 items-center'>
                                <DropdownMenu className="">
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user.photoUrl} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 dark:bg-gray-800">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                                                <User />
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                                                <ChartColumnBig />
                                                <span>Your Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                                                <LiaCommentSolid />
                                                <span>Comments</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                                                <FaRegEdit />
                                                <span>Write Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logoutHandler}>
                                            <LogOut />
                                            <span>Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>
                            </div> : <div className='ml-7 md:flex gap-2'>
                                <Link to={"/login"}><Button>Login</Button></Link>
                                <Link to={"/signup"}><Button>Signup</Button></Link>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
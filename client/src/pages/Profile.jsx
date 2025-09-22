import { Card } from '@/components/ui/card'
import userLogo from '../assets/user.jpg'
import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";


const Profile = () => {

  const [open, setOpen] = useState(false)
  return (
    <div className='pt-20 md:ml-[320px] md:h-screen'>
      <div className='max-w-6xl mx-auto mt-8 '>
        <Card className=" flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <div className='flex flex-col items-center justify-center md:w-[400px]'>
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={userLogo} />
            </Avatar>

            <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>Mern Stack Developer</h1>

            <div className='flex gap-4 items-center'>
              <Link><FaFacebook className='w-6 h-6' /></Link>
              <Link><FaLinkedin className='w-6 h-6' /></Link>
              <Link><FaGithub className='w-6 h-6' /></Link>
              <Link><FaInstagram className='w-6 h-6' /></Link>
            </div>
          </div>

          <div>
            <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome</h1>
            <p><span className='font-semibold'>Email:</span>HaiulSkk037@gmail.com</p>

            <div className='flex flex-col gap-2 items-start justify-center
             my-5'>
              <Label>About Me</Label>
              <p className='border dark:border-gray-600 p-2 rounded-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, assumenda asperiores! Consectetur dolor hic praesentium voluptatem laudantium totam porro officia doloremque iste distinctio, officiis repellat autem rem. Quasi, saepe tenetur!</p>
            </div>

            <Dialog open={open} onOpenChange={setOpen} >
              <Button onClick={() => setOpen(true)} >Edit Profile</Button>
              <DialogContent className="md:w-[425px] ">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit Profile</DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex gap-2'>
                    <div>
                      <Label htmlFor="name" className="text-right mb-2">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-right mb-2">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <div>
                      <Label className="mb-2">Facebook</Label>
                      <Input id="facebook"
                        name="facebook"
                        placeholder="Enter a URL"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Instagram</Label>
                      <Input id="instagram"
                        name="instagram"
                        placeholder="Enter a URL"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <div>
                      <Label className="mb-2">Linkedin</Label>
                      <Input id="linkedin"
                        name="linkedin"
                        placeholder="Enter a URL"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Github</Label>
                      <Input id="github"
                        name="github"
                        placeholder="Enter a URL"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-right mb-2">
                      Description
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Enter a description"
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                  <div >
                    <Label htmlFor="name" className="text-right mb-2">
                      Picture
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"

                      className="w-[277px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Profile
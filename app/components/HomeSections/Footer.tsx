import React from 'react'
import Image from 'next/image'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Sitemap from './Sitemap';

const Footer = () => {
    return (
        <div className='flex py-64 mx-64 justify-between'>
            <div className='flex flex-col space-y-48'>
                <div className='flex gap-x-48'>
                    <FacebookIcon />
                    <InstagramIcon />
                    <YouTubeIcon />
                    <LinkedInIcon />
                    <TwitterIcon />
                </div>
                <div className='flex space-x-8 items-center justify-center text-subheading'>
                    <Image
                        src='/media/favicon.png'
                        alt='logo viajar esim'
                        width={36}
                        height={36}
                    />
                    <h1 className='font-semibold'>ViajareSIM</h1>
                </div>
            </div>
            <Sitemap />
        </div>
    )
}

export default Footer

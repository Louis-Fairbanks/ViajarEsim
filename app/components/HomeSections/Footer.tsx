import React from 'react'
import Image from 'next/image'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Sitemap from './Sitemap';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start py-24 mx-24 sm:py-64 sm:mx-64'>
            <div className='flex flex-col space-y-48 justify-center lg:mb-0 mb-24'>
                <Link href='/'>
                    <div className='flex space-x-8 items-center justify-center text-subheading'>
                        <Image
                            src='/img/favicon.png'
                            alt='logo viajar esim'
                            width={36}
                            height={36}
                        />
                        <h1 className='font-semibold'>ViajareSIM</h1>
                    </div>
                </Link>
                <div className='flex gap-x-24 sm:gap-x-48'>
                    <Link href='https://www.facebook.com/profile.php?id=61564319581940'>
                        <FacebookIcon />
                    </Link>
                    <Link href='https://www.instagram.com/viajaresim'>
                        <InstagramIcon />
                    </Link>
                    <Link href='https://www.youtube.com/@ViajareSIM'>
                        <YouTubeIcon />
                    </Link>
                    {/* <LinkedInIcon /> */}
                    <Link href='https://x.com/viajaresim'>
                        <TwitterIcon />
                    </Link>
                    <Link href='https://www.tiktok.com/@viajaresim'>
                        <Image className='mt-2'
                            src='/media/tiktok-svgrepo-com.svg'
                            alt='tiktok'
                            height={20}
                            width={20}
                        />
                    </Link>
                </div>
            </div>
            <Sitemap />
        </div>
    )
}

export default Footer

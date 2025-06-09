'use server'
import Link from 'next/link';
import { Button } from './ui/button';
import { PiReadCvLogoBold } from "react-icons/pi";
import FlipImage from './FlipImage';

export async function Hero() {
  return (
    <section className="dark flex flex-col items-center justify-center px-4 py-2 print:py-4">
  {/* Heading */}
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-dm-serif-text mb-2 text-center animate-fade-in print:!opacity-100 print:!transform-none">
    MOHAMMED SAHIL KHAN
  </h1>


      {/* Profile Image */}
      {/* <div className="w-32 h-32 mb-4 rounded-full overflow-hidden animate-scale-up print:!opacity-100 print:!transform-none">
        <Image
          src="/msk.png"
          alt="Mohammed Sahil Khan"
          width={128}
          height={128}
          className="object-cover"
          priority
        />
      </div> */}
      <FlipImage/>

      {/* Subtitle */}
      <p className="text-lg mb-4 max-w-xl text-center animate-fade-in print:!opacity-100 print:!transform-none">
        Software Developer | AI Enthusiast | Problem Solver
      </p>

      {/* Links and Button */}
      <div className="flex flex-col items-center space-y-4 animate-fade-in print:!opacity-100 print:!transform-none">
        {/* <div className="flex space-x-4">
          <Link href="https://github.com/sahyl" target="_blank" rel="noopener noreferrer">
            <FiGithub className="w-6 h-6 hover:text-gray-600 transition-colors print:text-black" />
          </Link>
          <Link href="https://www.linkedin.com/in/saaahil/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin className="w-6 h-6 hover:text-gray-600 transition-colors print:text-black" />
          </Link>
          <Link href="mailto:mohammedsahilkhan.msk@gmail.com">
            <IoIosMail className="w-6 h-6 hover:text-gray-600 transition-colors print:text-black" />
          </Link>
          <Link href="https://leetcode.com/u/saaahil/" target="_blank" rel="noopener noreferrer">
            <TbBrandLeetcode className="w-6 h-6 hover:text-gray-600 transition-colors print:text-black" />
          </Link>
        </div> */}
        <Button asChild className="bg-black text-white hover:bg-gray-800 print:bg-white print:text-black print:border print:border-black">
          <Link href="/Sahil_Khan_resume24.pdf" download>
            <PiReadCvLogoBold className="w-4 h-4 mr-2" />
            Download Resume
          </Link>
        </Button>
      </div>
    </section>
  );
}


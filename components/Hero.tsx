import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { TbBrandLeetcode } from "react-icons/tb";
import { PiReadCvLogoBold } from "react-icons/pi";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 pt-8">
      {/* Heading */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 text-center animate-fade-in">
        MOHAMMED SAHIL KHAN
      </h1>

      {/* Profile Image */}
      <div className="w-48 h-48 mb-8 rounded-full overflow-hidden animate-scale-up">
        <Image
          src="/sahil.jpg"
          alt="Mohammed Sahil Khan"
          width={192}
          height={192}
          className="object-cover"
          priority
        />
      </div>

      {/* Subtitle */}
      <p className="text-xl mb-8 max-w-2xl text-center animate-fade-in">
        Software Developer | AI Enthusiast | Problem Solver
      </p>

      {/* Links and Button */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in">
        <div className="flex space-x-6">
          <Link href="https://github.com/sahyl">
            <FiGithub className="w-8 h-8 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/in/saaahil/">
            <FiLinkedin className="w-8 h-8 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="mailto:mohammedsahilkhan.msk@gmail.com">
            <IoIosMail className="w-8 h-8 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://leetcode.com/u/saaahil/" target="_blank" rel="noopener noreferrer">
            <TbBrandLeetcode className="w-8 h-8 hover:text-gray-600 transition-colors" />
          </Link>
        </div>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/Sahil_Khan_resume24.pdf" download>
            <PiReadCvLogoBold className="w-5 h-5 mr-2" />
            Download Resume
          </Link>
        </Button>
      </div>
    </section>
  );
}

import Link from 'next/link'
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="dark py-4 px-4 sm:px-6 bg-white-100 print:bg-white print:border-t print:border-gray-200">
      
        <p className="text-center font-roboto text-xs print:text-[10px]">
          &copy;   {new Date().getFullYear()} Mohammed Sahil Khan. 
        </p>
      
    </footer>
  )
}


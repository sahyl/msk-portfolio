'use server'
export async function  Footer() {
  return (
    <footer className="dark py-4 px-4 sm:px-6 bg-white-100 print:bg-white print:border-t print:border-gray-200">
      
        <p className="text-center font-roboto text-xs print:text-[10px]">
          &copy;   {new Date().getFullYear()} Mohammed Sahil Khan. 
        </p>
      
    </footer>
  )
}


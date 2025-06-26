export default function NotFound() {
  return (
    <>
 
 <div className="min-h-screen flex flex-col">
  
  <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center max-w-4xl mx-auto w-full">

  <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%]  border-8 border-[#c6d9e3] overflow-hidden">        
     <img alt="Sad cartoon kid sitting on the floor with a big 404 sign behind, colorful playful style, bright background" 
     className="w-full max-w-md " height="320" src="/assets/images/404.jpg" width="400"/>
  </div>

  
   
   <h1 className="text-6xl font-extrabold text-gray-600 mb-5 mt-5">
    404
   </h1>
   <p className="text-xl text-gray-400 mb-6">
    Oops! The page you are looking for does not exist.
   </p>
   <a className="inline-flex items-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition" href="/en">
    <i className="fas fa-home">
    </i>
    <span>
     Go back home
    </span>
   </a>
  </main>
 
 </div>

    </>
  );
}
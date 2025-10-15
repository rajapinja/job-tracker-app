export default function MainHeading({ title }) {
  return (
    <div className="flex justify-center">
         <h2 className=" text-center text-2xl md:text-3xl center font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 
                   drop-shadow-md mb-4">
            {title}
        </h2>
    </div>   
  );
}
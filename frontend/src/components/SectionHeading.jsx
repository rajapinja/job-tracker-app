export default function SectionHeading({ title }) {
  return (
    <div className="flex justify-center">
         <h4 className=" text-center text-xl md:text-xl center font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-pink-500 via-green-400 to-blue-500 
                   drop-shadow-md mb-1">
            {title}
        </h4>
    </div>
   
  );
}
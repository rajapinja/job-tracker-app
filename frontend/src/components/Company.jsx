import SectionHeading from '../components/SectionHeading';


export default function Company({ companies }) {




  return (
    <div className=" relative rounded-2xl p-[2px] 
        bg-gradient-to-r from-blue-300 via-pink-300 to-teal-400 shadow-md 
        transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"> 
      <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 overflow-x-auto max-w-full">
        <SectionHeading title={"Companies"} />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {companies.map((c) => (
                <div
                    key={c.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow border dark:border-gray-700
                              hover:shadow-[0_0_25px_rgba(0,255,255,0.4),0_0_25px_rgba(255,0,150,0.3)]
                              transition-all duration-300"
                >
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    {c.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {c.industry} — {c.location}
                    </p>
                    {c.website && (
                    <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    >
                        {c.website}
                    </a>
                    )}
                </div>
                ))}
            </div>  
          </div>
    </div>
  );
}
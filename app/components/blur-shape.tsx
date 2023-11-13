export const BlurShape = () => {
    return (
    <div className="relative grid h-[300px] w-[300px] place-items-center opacity-20 lg:h-[750px] lg:w-[750px] blur-xl lg:blur-3xl">
        <div className="relative w-full h-full">
        <div className="absolute left-0 top-0 w-32 h-32 md:h-96 md:w-96 rounded-full bg-lime-400" />
        <div className="absolute right-0 top-0 w-32 h-32 md:h-96 md:w-96 rounded-full bg-cyan-400" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-32 h-32 md:h-96 md:w-96 rounded-full bg-indigo-400" />
        </div>
      </div> 
    )
};
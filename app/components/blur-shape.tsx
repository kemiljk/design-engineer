export const BlurShape = () => {
    return (
    <div className="relative grid h-[80%] w-[80%] place-items-center lg:opacity-20 dark:lg:opacity-10 lg:h-[750px] lg:w-[750px]"/>
        <div className="relative bg-white/50 dark:bg-slate-950/50 backdrop-blur-lg lg:bg-transparent lg:blur-3xl">
        <div className="absolute left-0 top-0 w-24 h-24 md:h-96 md:w-96 rounded-full bg-lime-400" />
        <div className="absolute right-0 top-0 w-24 h-24 md:h-96 md:w-96 rounded-full bg-cyan-400" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-24 h-24 md:h-96 md:w-96 rounded-full bg-indigo-400" />
      </div>
    )
};
import { MousePointer } from "./components/mouse-pointer";
import { Form } from "./components/waitlist-form";
import { getHome } from "@/lib/cosmic";

export default async function Home() {
  const home = await getHome();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="opacity-20 dark:opacity-10 w-[750px] h-[750px] relative grid place-items-center blur-3xl">
        <div className="w-96 h-96 left-0 top-0 absolute bg-lime-400 rounded-full blur-3xl" />
        <div className="w-96 h-96 right-0 top-0 absolute bg-cyan-400 rounded-full blur-3xl" />
        <div className="w-96 h-96 mx-auto left-0 right-0 bottom-0 absolute bg-indigo-400 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 max-w-5xl mx-auto">
        <div className="grid w-full h-full place-items-center">
          <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center">
              <p className="flex z-10 font-sans font-medium leading-none text-lime-700 dark:text-lime-300 w-max border-lime-500 bg-white/50 dark:border-lime-600 dark:bg-slate-950/25 dark:from-inherit lg:static rounded-full border py-3 px-4">
                Coming in 2024
              </p>
            </div>
            <h1 className="flex gap-4 justify-center items-center text-slate-700 dark:text-slate-300">
              <div className="relative p-4 border-4 border-slate-400 dark:border-slate-600 border-dashed rounded">
                <span className="text-7xl font-bold italic tracking-tight font-serif">
                  design
                </span>
                <div className="absolute -bottom-8 -right-8">
                  <MousePointer />
                </div>
              </div>
              <span className="text-7xl font-semibold font-mono tracking-tighter">
                {"<Engineer />"}
              </span>
            </h1>
            <p className="max-w-3xl mx-auto font-sans text-3xl leading-snug tracking-tight text-center text-slate-600 dark:text-slate-400">
              {home.metadata.description}
            </p>
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}

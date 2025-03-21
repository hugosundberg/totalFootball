import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const TeamStats = ({ seasonStats, competitions }: TeamStats) => {
  if (!seasonStats || !competitions) return null;

  console.log("COMPS", competitions);

  return (
    
    <div className="flex flex-col items-center justify-center w-full h-full dark:bg-black text-sm sm:text-base shadow-xl">
      
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
      <div className="bg-green-500 w-full h-16 flex items-center justify-center text-white dark:bg-green-600">
        <h1>Season Stats</h1>
        {competitions.map((competition) => (
          <div key={competition.competitions.league.id}>
            <img src={competition.competitions.league.logo} alt="" className="h-10"/>
            <h2>{competition.competitions.league.name}</h2>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full h-full bg-white dark:bg-zinc-900 pt-4 sm:rounded-2xl overflow-hidden">
        <h2 className="text-2xl text-center font-bold dark:text-white mb-4">
          Competition stats
        </h2>

        <div>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-t-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p className="col-start-2">Home</p>
            <p>Away</p>
            <p>Total</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Games played</p>
            <p>{seasonStats.fixtures.played.home}</p>
            <p>{seasonStats.fixtures.played.away}</p>
            <p>{seasonStats.fixtures.played.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Wins</p>
            <p>{seasonStats.fixtures.wins.home}</p>
            <p>{seasonStats.fixtures.wins.away}</p>
            <p>{seasonStats.fixtures.wins.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Draws</p>
            <p>{seasonStats.fixtures.draws.home}</p>
            <p>{seasonStats.fixtures.draws.away}</p>
            <p>{seasonStats.fixtures.draws.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Losses</p>
            <p>{seasonStats.fixtures.losses.home}</p>
            <p>{seasonStats.fixtures.losses.away}</p>
            <p>{seasonStats.fixtures.losses.total}</p>
          </div>

          <p className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            GOALS
          </p>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Goals for</p>
            <p>{seasonStats.goals.for.total.home}</p>
            <p>{seasonStats.goals.for.total.away}</p>
            <p>{seasonStats.goals.for.total.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Goals against</p>
            <p>{seasonStats.goals.against.total.total}</p>
            <p>{seasonStats.goals.against.total.away}</p>
            <p>{seasonStats.goals.against.total.home}</p>
          </div>

          <p className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            GOALS AVERAGE
          </p>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid  border-zinc-200 dark:border-zinc-500">
            <p>Goals average</p>
            <p>{seasonStats.goals.for.average.home}</p>
            <p>{seasonStats.goals.for.average.away}</p>
            <p>{seasonStats.goals.for.average.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;

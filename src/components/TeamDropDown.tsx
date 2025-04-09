import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface TeamDropDownProps {
  currentCompetition: TeamCompetitions | undefined;
  setCurrentCompetition: (competition: Competition) => void;
  competitions: Competition[];
}

const TeamDropDown = ({
  currentCompetition,
  setCurrentCompetition,
  competitions,
}: TeamDropDownProps) => {
  if (!competitions) {
    return null;
  }

  return (
    <Menu as="div" className="relative inline-block text-left w-full m-2">
      <div>
        <MenuButton className="inline-flex gap-x-1.5rounded-md bg-zinc-800 px-6 py-2 text-md rounded-xl font-semibold text-white shadow-xs ring-gray-300 ring-inset hover:bg-zinc-500">
          {currentCompetition?.competitions.league.name || "Select competition"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-10 w-full origin-top-right rounded-md dark:bg-zinc-800 
          dark:text-white ring-1 shadow-lg ring-black/5 
          transition focus:outline-hidden data-closed:scale-95 
          data-closed:transform data-closed:opacity-0 
          data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
      >
        <div className="overflow-hidden rounded-xl dark:text-white">
          {competitions.map((competition) => (
            <MenuItem key={competition.competitions.league.id}>
              <button
                onClick={() => setCurrentCompetition(competition)}
                className="flex p-4 items-center w-full text-left hover:cursor-pointer hover:bg-zinc-700"
              >
                <img
                  src={competition.competitions.league.logo}
                  alt=""
                  className="h-8 w-8 object-contain bg-white p-2 rounded-full"
                />
                <h2 className="px-4">{competition.competitions.league.name}</h2>
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default TeamDropDown;

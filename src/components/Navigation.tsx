
import football from "../../assets/football.webp";
import football2 from "../../assets/football2.webp";

const Navigation = () => {

  return (
    <nav className="bg-white dark:bg-green-900 fixed w-full z-50 shadow-lg">
      <div className="max-w-screen-xl h-16 flex flex-wrap items-center justify-between mx-auto p-4 md:p-4 lg:py-1.5">
        <a href="/totalFootball" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center flex text-2xl font-semibold whitespace-nowrap dark:text-white">
            <img
              src={football}
              className=" hidden dark:block h-8 self-center mr-2"
              alt="Flowbite Logo"
            />
            <img
              src={football2}
              className="h-8 self-center mr-2 dark:hidden"
              alt="Flowbite Logo"
            />
            Total Football
          </span>
        </a>

        {/* NAV MENU */}
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="/totalFootball"
                className="block py-2 px-3 dark:text-white rounded md:bg-transparent md:p-0  hover:underline"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/totalFootball/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

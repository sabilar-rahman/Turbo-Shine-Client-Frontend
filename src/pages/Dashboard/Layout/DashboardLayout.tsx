import PageTitle from "@/pages/shared/PageTitleHelmet/PageTitle";
import { useCurrentUser } from "@/redux/api/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import adminRoutes from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { FaArrowLeft } from "react-icons/fa";
import {
  sidebarItemGenerator,
  TSidebarItem,
} from "@/utils/sidebarItemGenerator";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TUser } from "@/types";
import { RiArchiveDrawerLine } from "react-icons/ri";

const DashboardLayout = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const user = useAppSelector(useCurrentUser) as TUser | null;
  const role = user?.role;

  let sidebarItems: TSidebarItem[] = [];

  if (role) {
    switch (role) {
      case "admin":
        sidebarItems = sidebarItemGenerator(adminRoutes, role);
        break;
      case "user":
        sidebarItems = sidebarItemGenerator(userRoutes, role);
        break;
      default:
        break;
    }
  }

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordion: string) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  return (
    <div className="container mx-auto">
      <div className="drawer lg:drawer-open font-lora">
        <PageTitle title="Dashboard | Turbo Shine" />
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-200 p-5">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-success  text-white drawer-button lg:hidden"
          >
            <RiArchiveDrawerLine />
          </label>
          <Outlet />
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu  text-black font-semibold min-h-full w-72 p-8">
            <li className="py-1 text-[17px]">
              <Link
                to="/"
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
              >
                <FaArrowLeft className="w-5 h-5 mr-2" />{" "}
                {/* Using the Font Awesome icon */}
                TurboShine
              </Link>
            </li>
            {sidebarItems.map((item) => (
              <li className="py-1 text-[17px]" key={item.key}>
                {item.children && item.children.length > 0 ? (
                  <>
                    {/* Parent item that toggles the children */}
                    <div
                      onClick={() => toggleAccordion(item.key)}
                      className="cursor-pointer flex justify-between items-center"
                    >
                      <span>{item.label}</span>

                      {openAccordion === item.key ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 transition-transform transform rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 transition-transform transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      )}
                    </div>
                    {/* Show child items if accordion is open */}
                    {openAccordion === item.key && (
                      <ul className="ml-4">
                        {item.children.map((child) => (
                          <li key={child.key} className="py-1">
                            {child.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  // If no children, display the item as a simple link
                  item.label
                )}
              </li>
            ))}
            <div className="md:mt-20">
              {/* <button
            onClick={handleLogout}
            className="w-full py-3 px-5 hover:bg-hover bg-primary text-white font-bold rounded-md"
          >
            Log out
          </button> */}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

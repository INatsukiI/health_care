import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../../context/auth";
import { login, logout } from "../../../lib/auth";
import { useModal } from "react-hooks-use-modal";

const HeaderNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { fbUser, user } = useAuth();
  const [Modal, open, close, isOpen] = useModal("__next");

  if (!fbUser) {
    return (
      <>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/about">ABOUT</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="#!" onClick={login}>
                    LOG IN
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="#!" onClick={login}>
                Log in
              </Link>
            </li>
          </ul>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </>
    );
  }

  return (
    <>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              {!user && (
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/create">Sign up</Link>
                </li>
              )}
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/mypage">My Page</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/health_care">Health Care</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/contents">Contents</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="#!" onClick={logout}>
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          {!user && (
            <li>
              <Link href="/create">Sign up</Link>
            </li>
          )}
          <li>
            <Link href="/mypage">My Page</Link>
          </li>
          <li>
            <Link href="/health_care">Health Care</Link>
          </li>
          <li>
            <Link href="/contents">Contents</Link>
          </li>
          <li>
            <Link href="#!" onClick={open}>
              Log out
            </Link>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      <Modal>
        <div className="text-center bg-slate-100 px-14 py-7 rounded-xl">
          <h1 className="text-3xl mb-4">ログアウトしてよろしいですか？</h1>
          <button
            onClick={logout}
            className="bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HeaderNav;

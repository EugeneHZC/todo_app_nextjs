"use client";

import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TodoModal from "./TodoModal";

const defaultImage = "/user.png";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function setupProviders() {
      const response = await getProviders();

      setProviders(response);
    }

    setupProviders();

    if (session?.user) router.push("/");
  }, []);

  return (
    <nav className="w-full pt-3 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" width={50} height={50} alt="app logo" />
        <p className="logo_text">Todo App</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="gap-3 items-center sm:flex hidden">
        {session?.user && (
          <button className="black_btn h-[70%]" onClick={() => setIsModalOpen(true)}>
            Create Todo
          </button>
        )}

        <button
          className="black_btn h-[70%]"
          type="button"
          onClick={() => {
            if (session?.user) signOut();
            else signIn(providers?.google.id);
          }}
        >
          {session?.user ? "Sign Out" : "Sign In"}
        </button>

        {session?.user && (
          <Image
            src={session.user.image ?? defaultImage}
            width={50}
            height={50}
            alt="profile image"
            onClick={() => router.push("/profile")}
            className="cursor-pointer rounded-full"
          />
        )}

        {isModalOpen && <TodoModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="Create" />}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user && (
          <div className="flex">
            <Image
              src={session.user.image ?? defaultImage}
              alt="profile image"
              width={50}
              height={50}
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="cursor-pointer rounded-full"
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link">
                  My Profile
                </Link>
                {session.user && (
                  <button className="dropdown_btn" onClick={() => setIsModalOpen(true)}>
                    Create Todo
                  </button>
                )}
                <button className="dropdown_btn text-red-500" onClick={() => signOut()}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {!session?.user && <button className="black_btn">Sign In</button>}
      </div>
    </nav>
  );
};

export default Navbar;

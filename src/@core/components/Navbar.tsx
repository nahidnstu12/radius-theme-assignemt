import { LINK_CREATE_POST, LINK_LOGIN } from "@/@core/helpers/apiLinks";
import { USER_ROLE } from "@/@core/helpers/enum";
import { getSession } from "@/@core/lib/auth";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const session = await getSession();
  const isAuthenticated = !!session;
  const userRole = session?.role;
  console.log("session", session);

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow">
      <div>
        <h5 className="text-xl font-bold leading-none pb-1 text-center">
          {userRole === USER_ROLE.REGULAR
            ? "Regular Panel"
            : userRole === USER_ROLE.ADMIN
            ? "Admin Panel"
            : ""}
        </h5>
        <p className="text-sm font-light leading-none">
          {session?.email as string}
        </p>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            {userRole === USER_ROLE.REGULAR && (
              <Link
                className="inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                href={LINK_CREATE_POST}
              >
                Create Post
              </Link>
            )}
            <LogoutButton />
          </>
        ) : (
          <Link
            className="inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
            href={LINK_LOGIN}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

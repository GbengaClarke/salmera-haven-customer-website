import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import HeaderProfileMenu from "./HeaderProfileMenu";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
export type HeaderType = {
  user: UserType;
};

function Header({ user }: HeaderType) {
  return (
    <header className="fixed top-0 right-0 left-0 mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 border-b border-indigo-500/20 bg-slate-950 px-3 text-xl font-bold md:px-5">
      <Link href={"/"}>
        <CompanyLogo
          imageSize="h-8 w-10"
          contStyle="gap-1.5  "
          textStyle={`font-cormorant text-indigo-200`}
        />
      </Link>

      <HeaderProfileMenu user={user} />
    </header>
  );
}

export default Header;

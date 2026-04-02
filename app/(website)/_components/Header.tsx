import CompanyLogo from "./CompanyLogo";
import HeaderProfileMenu from "./HeaderProfileMenu";

function Header() {
  return (
    <header className="flex h-16 items-center gap-2 border-b border-indigo-500/20 px-3 text-xl font-bold">
      {/* <div className="font-cormorant">Salmera Haven</div> */}

      <CompanyLogo
        imageSize="h-8 w-10"
        contStyle="gap-1.5  "
        textStyle={`font-cormorant text-indigo-200`}
        // textStyle={`${cormorant.className} text-indigo-200`}
      />

      <HeaderProfileMenu />
    </header>
  );
}

export default Header;

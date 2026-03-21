import Image from "next/image";

function CompanyLogo({
  contStyle = "",
  imageSize = "h-12 w-14",
  textStyle = "",
}) {
  return (
    <div
      className={`flex w-full max-w-md items-center text-center ${contStyle}`}
    >
      <div className={`relative overflow-hidden ${imageSize}`}>
        <Image
          src="/icon.png"
          alt="logo"
          fill
          priority
          sizes="58px"
          // placeholder="blur"
          className="object-contain"
        />
      </div>
      <h1 className={`drop-shadow-lg ${textStyle}`}>Salmera Haven</h1>
    </div>
  );
}

export default CompanyLogo;

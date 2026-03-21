function AuthFooter() {
  return (
    <footer className="relative z-10 mt-6 w-full py-6 text-center text-sm text-white/80">
      <div className="container mx-auto px-4">
        <p>
          Copyright &copy; {new Date().getFullYear()} Salmera Haven. All rights
          reserved |{" "}
          <span className="cursor-pointer hover:text-white hover:underline">
            Terms of Use
          </span>{" "}
          |{" "}
          <span className="cursor-pointer hover:text-white hover:underline">
            Privacy Policy
          </span>
        </p>
      </div>
    </footer>
  );
}

export default AuthFooter;

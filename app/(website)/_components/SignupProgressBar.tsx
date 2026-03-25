// type SignupProgressBarType = {
//   step: number;
// };

// function SignupProgressBar({ step }: SignupProgressBarType) {
//   const step1 = step === 1;
//   const step2 = step === 2;
//   const step3 = step === 3;

//   // const steps = [
//   //   { id: 1, label: "Basic Info" },
//   //   { id: 2, label: "Authentication" },
//   //   { id: 3, label: "Security" },
//   // ];

//   return (
//     <div className="my-6">
//       <div
//         className={`mb-2 flex justify-between gap-4 px-2 ${step3 && "text-right"}`}
//       >
//         <p
//           className={` ${step1 ? "flex-1 scale-103 text-blue-600" : "text-stone-500"} text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-500 ease-in-out`}
//         >
//           1. Basic Info
//         </p>
//         <p
//           className={` ${step2 ? "scale-103 text-blue-600" : "text-stone-500"} text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-500 ease-in-out`}
//         >
//           2. Authentication
//         </p>
//         <p
//           className={` ${step3 ? "flex-1 scale-103 text-blue-600" : "text-stone-500"} text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-500 ease-in-out`}
//         >
//           3. Security
//         </p>
//       </div>

//       {/* progress bar */}
//       <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
//         <div
//           className="absolute h-full rounded-2xl bg-emerald-500 transition-all duration-700 ease-in-out"
//           style={{
//             width: `${(step / 3) * 100}%`,
//             // width: `${(step / steps.length) * 100}%`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default SignupProgressBar;

type SignupProgressBarType = {
  step: number;
};

function SignupProgressBar({ step }: SignupProgressBarType) {
  const step1 = step === 1;
  const step2 = step === 2;
  const step3 = step === 3;

  // const steps = [
  //   { id: 1, label: "Basic Info" },
  //   { id: 2, label: "Authentication" },
  //   { id: 3, label: "Security" },
  // ];

  return (
    <div className="my-6">
      <div
        className={`mb-2 flex justify-between gap-4 md:px-2 ${step3 && "text-right"}`}
      >
        <p
          className={` ${step1 ? "flex-1 text-blue-600 sm:scale-103" : "text-stone-500"} tracking-widerx text-[.6rem] font-semibold whitespace-nowrap uppercase transition-all duration-500 ease-in-out md:text-xs`}
        >
          1. Basic Info
        </p>
        <p
          className={` ${step2 ? "text-blue-600 sm:scale-103" : "text-stone-500"} tracking-widerx text-[.6rem] font-semibold whitespace-nowrap uppercase transition-all duration-500 ease-in-out md:text-xs`}
        >
          2. Authentication
        </p>
        <p
          className={` ${step3 ? "flex-1 text-blue-600 sm:scale-103" : "text-stone-500"} tracking-widerx text-[.6rem] font-semibold whitespace-nowrap uppercase transition-all duration-500 ease-in-out md:text-xs`}
        >
          3. Security
        </p>
      </div>

      {/* progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className="absolute h-full rounded-2xl bg-emerald-500 transition-all duration-700 ease-in-out"
          style={{
            width: `${(step / 3) * 100}%`,
            // width: `${(step / steps.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default SignupProgressBar;

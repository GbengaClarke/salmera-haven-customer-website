import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

.hidden-mobile {
    @media (max-width:850px) {
      display: none;
    }
  }

  :root, :root.light-mode{
  /* Grey */
  --color-grey-0: #ffff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;
  --color-black: #00000;

  --color-blue-100: #e0f2fe;
  --color-blue-500: #286BDB;
  --color-blue-700: #18438A;
  --color-mint-100: #dcfce7;
  --color-mint-500: #00C39E;
  --color-janquil-100: #eced89;
  --color-janquil-500: #ffce20;
--color-janquil-600: #857d0e;
--color-arrival-bg: #DCFCE7;
--color-arrival-text: #166534;

--color-departure-bg: #e6ebfe;
--color-departure-text: #4338CA;


  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-red-100: #e0e7ff;
  --color-red-500: #fe6f6f;
--color-brand-mint: #11b698;


  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px 1px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --image-grayscale: 0;
  --image-opacity: 100%;
}

:root.dark-mode{

  --color-grey-0: #121212;
--color-grey-50: #1f2226

;
--color-grey-100: #22282e;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #c3c7ce;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;
--color-black: #e5e7eb;


--color-blue-100: #18438A; 
--color-blue-500: #e0f2fe;
--color-blue-700: #3B6FC4;
--color-mint-100: #166534;
--color-mint-500: #dcfce7;
--color-janquil-100: #857d0e;
--color-janquil-500: #fef9c3;
--color-janquil-600: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-red-500: #e0e7ff;
--color-brand-mint: #206a20;
--color-arrival-bg: #14532D;
--color-arrival-text: #BBF7D0;

--color-departure-bg: #1E1B4B;
--color-departure-text: #C7D2FE;



--color-red-100: #fee2e2;
--color-red-800: #fee2e2;
--color-red-700: #b91c1c;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px 1px rgba(256, 256, 256, 0.04);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
}

:root{
    /* Indigo */
    --color-brand-50:  #F3F7FF;
  --color-brand-100: #E8F0FE;
  --color-brand-200: #C6DAFC;
  --color-brand-300: #9BBEFA;
  --color-brand-400: #5F93F0;
  --color-brand-500: #286BDB; /* base */
  --color-brand-600: #1F56B3;
  --color-brand-700: #18438A;
  --color-brand-800: #122F61;
  --color-brand-900: #0B1E3D;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  
}


#root{
  padding: 0%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;


  transition: opacity 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;

}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
background-color: var(--color-grey-50);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;

  
    /* Remove arrows - Chrome, Safari, Edge */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  
    /* Remove arrows - Firefox */
    &[type="number"] {
      -moz-appearance: textfield;
    }


}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}


h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  /* hyphens: auto; */
  font-family: "Inter", sans-serif;
}

p {
  overflow-wrap: break-word;
  /* hyphens: auto; */
  hyphens: none;

}

img {
  max-width: 100%;


  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;

export default GlobalStyles;

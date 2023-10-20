const index = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:rotate-180"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </div>
      <h1 className="mt-5">Oops! An error ocurred when retrieving data...</h1>
    </div>
  );
};

export default index;

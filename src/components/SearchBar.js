"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [listRelevant, setListRelevant] = useState();

  useUpdateEffect(() => {
    const timer = setTimeout(async () => {
      setListRelevant();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  // Ni tdi biar kek Linkny (di search dropdownny) ke click dulu sblm dropdownny ilang. [mungkin bs pake useEffect aj kli?]
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Update searchValue tiap ketik
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="h-full w-520 py-2">
      <div className="h-full border-solid border-gray-100 border rounded-full bg-gray-100 flex justify-center items-center focus-within:border-gray-300">
        <input
          className="h-3/5 bg-transparent w-3/4 focus:outline-none ml-4"
          type="text"
          placeholder="Search users or products"
          value={searchValue}
          onInput={(e) => {
            handleSearch(e);
          }}
          onFocus={(e) => {
            setShowDropDown(true);
          }}
          onBlur={async (e) => {
            sleep(150).then(() => setShowDropDown(false));
          }}
        ></input>
        <span className="mx-2 border-r-solid border-r border-r-slate-300 h-1/2 px-2 hover:cursor-pointer">
          <div onClick={() => setSearchValue("")}>
            <Image src={deleteSvg} alt="del" />
          </div>
        </span>
        <span className="hover:cursor-pointer" onClick={() => {}}>
          <Image src={searchSvg} alt="search" />
        </span>
      </div>

      {showDropDown && (
        <div className="fixed h-auto w-[520px] bg-white top-[64px] rounded-lg shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.3)]">
          {searchValue === "" && (
            <h2 className="mt-2 text-[12px] text-gray-400 ml-2 mb-2">
              You may like:{" "}
            </h2>
          )}
          <div className="h-auto w-full flex flex-col">
            {listRelevant?.products?.length ? (
              listRelevant?.products?.map((product, i) => {
                return (
                  <Link
                    key={i}
                    className="text-sm flex flex-row hover:bg-gray-100"
                    href={`/user/${product?.shop?.user?.username}/products/${product?.itemId}`}
                  >
                    <div className="h-9 w-8 flex justify-center items-center">
                      <Image alt="search" height={12} width={12}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </Image>
                    </div>
                    <div className="h-9 w-full flex items-center mx-2 font-medium">
                      {product?.name}
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="h-10 w-full text-gray-400 text-sm flex flex-col justify-center">
                <div className="pl-4">No ID matched!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

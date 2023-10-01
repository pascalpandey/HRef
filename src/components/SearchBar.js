"use client";

import Link from "next/link";
import Image from "next/image";
import searchSvg from "./search.svg";
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
    <div className="h-full w-full py-2 px-2">
      <div className="h-full border-solid border-gray-100 border rounded-full bg-gray-50 flex justify-center items-center focus-within:border-gray-300 text-black">
        <input
          className="bg-transparent w-full focus:outline-none ml-4"
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
        <span className="hover:cursor-pointer mr-4" onClick={() => {}}>
          <Image src={searchSvg} alt="search" />
        </span>
      </div>

      {showDropDown && (
        <div className="fixed h-auto w-[520px] bg-white top-[64px] rounded-lg shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.3)]">
          <div className="h-auto w-full flex flex-col">
            {listRelevant?.products?.length ? (
              listRelevant?.products?.map((product, i) => {
                return (
                  <Link
                    key={i}
                    className="text-sm flex flex-row hover:bg-gray-100"
                  >
                    <div className="h-9 w-8 flex justify-center items-center">
                      <Image src={searchSvg} alt="search" height={12} width={12}>
                      </Image>
                    </div>
                    <div className="h-9 w-full flex items-center mx-2 font-medium">
                      {product?.name}
                    </div>
                  </Link>
                );
              })
            ) : searchValue !== "" && (
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

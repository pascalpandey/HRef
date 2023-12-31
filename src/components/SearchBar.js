"use client";

import Image from "next/image";
import searchSvg from "./search.svg";
import { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

export default function SearchBar({ data, setOpenId, handleIsFocus, centerMapPos }) {
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [listRelevant, setListRelevant] = useState([]);
  const searchBar = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleOpenSearchBar)

    return () => {
      document.removeEventListener('click', () => handleOpenSearchBar);
    }
  }, [searchValue])

  useUpdateEffect(() => {
    if (searchValue === "") {
      setShowDropDown(false);
      handleIsFocus(false);
    } else {
      setShowDropDown(true);
      handleIsFocus(true);
    }
    setListRelevant(
      data.filter((item) => {
        return item.id.startsWith(searchValue);
      })
    );
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setOpenId();
  };

  const handleOpenSearchBar = (e) => {
    if (searchBar.current && !searchBar.current.contains(e.target)) {
      setShowDropDown(false);
      handleIsFocus(false);
    } else if (searchValue !== "") {
      setShowDropDown(true);
      handleIsFocus(true);
    } else {
      setShowDropDown(false);
      handleIsFocus(false);
    }
  }

  return (
    <div className="h-full w-full py-2 px-2" ref={searchBar}>
      <div className="h-full border-solid border-gray-100 border rounded-full bg-gray-50 flex justify-center items-center focus-within:border-gray-200 text-black">
        <input
          className="bg-transparent w-full focus:outline-none ml-4"
          type="text"
          placeholder="Search employees or candidates"
          value={searchValue}
          onInput={(e) => {
            handleSearch(e);
          }}
        ></input>
        <span className="hover:cursor-pointer mr-4" onClick={() => { }}>
          <Image src={searchSvg} alt="search" />
        </span>
      </div>

      {showDropDown && (
        <div className="fixed h-auto w-[624px] bg-white top-[100px] rounded-lg shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.3)]">
          <div className="h-auto w-full flex flex-col min-h-[46px]">
            {listRelevant?.length !== 0
              ? listRelevant?.map((person, i) => {
                return (
                  <div
                    key={i}
                    className="text-sm flex flex-row hover:bg-gray-100 items-center"
                    onClick={() => {
                      setOpenId(person.id);
                      centerMapPos(person);
                    }}
                  >
                    <div className="h-9 w-8 flex justify-center items-center">
                      <Image
                        src={searchSvg}
                        alt="search"
                        height={16}
                        width={16}
                      ></Image>
                    </div>
                    <div className="h-9 flex items-center mx-1 font-medium text-black">
                      {person.id}
                    </div>
                    <div className="flex gap-2 my-2 mx-2">
                      {JSON.parse(person.keywords.replace(/'/g, '"')).map(
                        (v, index) => {
                          return (
                            <div className="rounded-2xl bg-gray-100 text-black px-4 py-1 border border-gray-300" key={index}>
                              {v}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })
              : searchValue !== "" && (
                <div className="h-[46px] w-full text-gray-400 text-sm flex flex-col justify-center">
                  <div className="pl-4">No ID matched!</div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

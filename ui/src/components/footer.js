import React from "react";

export default function Footer() {
  return (
    <footer class="bg-black p-4 shadow md:flex md:items-center md:justify-between md:p-6">
      <span class="text-sm text-gray-300 sm:text-center">
        © 2023 WTF™. All Rights Reserved.
      </span>
      <ul class="mt-3 flex flex-wrap items-center text-sm text-gray-300 sm:mt-0">
        <li>
          <a
            href="#"
            class="mr-4 hover:text-orange-500 hover:underline md:mr-6 "
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            class="mr-4 hover:text-orange-500 hover:underline md:mr-6"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            class="mr-4 hover:text-orange-500 hover:underline md:mr-6"
          >
            Licensing
          </a>
        </li>
        <li>
          <a href="#" class="hover:text-orange-500 hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

import React from "react";
import Navbar from "../navbar";
import Link from "next/link";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container sm:px-0 px-2 mx-auto">
      <Navbar />
      {children}
      <div className="divider"></div>
      <footer className="flex flex-row gap-x-7 mb-2 p-2">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight">Links</h3>
          <ul className="text-stone-400">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tags">Search by Tag</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-extrabold tracking-tight">Socials</h3>
          <ul className="text-stone-400">
            <li>
              <a
                href="https://www.linkedin.com/in/matias-benitez81/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:agustinbenitez81@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/fatso1000"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

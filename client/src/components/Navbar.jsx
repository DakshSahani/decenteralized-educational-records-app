import React, { useState, useEffect, useRef } from "react";
import { truncateStr } from "../utils/truncateStr";
import { useAppContext } from "../context/Context";
import { Link } from "react-router-dom";

const Navbar = ({ showConnectModal }) => {
  const { wallet, resetWallet} = useAppContext();
  const [toggleValue, setToggle] = useState(false);

  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
    // eslint-disable-next-line
  }, [toggleValue]);

  return (
    <nav className="navbar">
      <div className="nav__header">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo leading-[1em] flex gap-4 items-center" href="/">
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="w-12 h-12"/>
          </Link>
          <div className="flex flex-col text-2xl gap-[-10px]">
            <div>Decentralized Academic </div>
            <div>Record System</div>
          </div>
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded !text-sm") || "nav__links !text-sm"
        }
      >
        <Link to="/records">Add Records</Link>
        <Link to="/records/add">Add Student</Link>
        <a
          href={"https://moi.technology"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          Built on MOI
        </a>
        <button
          className="connect-button"
          onClick={wallet ? () => resetWallet() : () => showConnectModal(true)}
        >
          {
            wallet 
            && wallet.getAddress
            ? 
            `Disconnect: ${wallet && truncateStr(wallet?.getAddress(), 11)}`
            : "Connect"
          }
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;

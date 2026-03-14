"use client";
import dynamic from 'next/dynamic';
const HeaderSection = dynamic(() => import("./Header"), { ssr: false });

const NavBar = ({ logo, name }: { logo: string, name: string }) => {
  return <HeaderSection logo={logo} name={name} />
}

export default NavBar

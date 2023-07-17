import Image from "next/image";

import logoImage from "/public/caixa-icon.png";

import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav className="bg-azul-standart w-full h-[115px]  px-4 text-white">
      <div className="flex items-center justify-between h-full w-full max-w-6xl mx-auto">
        <Image
          src={logoImage}
          alt="Imagem Logo"
          width={50}
          height={50}
          className="w-12 h-12"
        />

        <h2 className="text-lg hidden sm:block">Simulador Auto Caixa</h2>
        <p>Contato</p>
      </div>
    </nav>
  );
}

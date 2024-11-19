import React from 'react';
import Menu from '../Menu/Menu';
import Link from "next/link";
import Image from 'next/image';
import iconeUsuario from "../../../public/imagens/icone-usuario.png";

export default function Cabecalho() {
  return (
    <header>
        <h1>SmartEnergy</h1>
        <div>
          <Menu/>
          <Link href='/conta'><Image src={iconeUsuario} alt="Ícone do Usuário" className='icone_conta'/></Link>
        </div>
    </header>
  );
}

import Link from "next/link";

export default function Menu() {
  return (
    <ul className="ul_links">
        <li><Link href='/' className='links'>Home</Link></li>
        <li><Link href='/sugestoes' className='links'>Sugestões</Link></li>
        <li><Link href='/dados-consumo' className='links'>Dados de Consumo</Link></li>
        <li><Link href='/sobre' className='links'>Sobre</Link></li>
    </ul>
  )
}

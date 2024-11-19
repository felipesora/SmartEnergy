import Image from 'next/image';
import iconeGloboErro from "../../public/imagens/icone-globo-erro.png"

export default function NotFound() {
    return (
        <div className='container_erro'>
            <h1>Página Não Encontrada!</h1>
            <Image src={iconeGloboErro} alt="imagem de erro 404 - Not Found" className='imagem_erro_404'/>
            <h2>Not Found - 404</h2>
        </div>
    )
}
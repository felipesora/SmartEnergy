import fotoFelipeSora from "../../../public/imagens/foto-felipe-sora-750px.jpg";
import fotoFelipePizzi from "../../../public/imagens/foto-felipe-pizzinato-750px.jpeg";
import iconeLinkedin from "../../../public/imagens/icone-linkedin.png";
import iconeGithub from "../../../public/imagens/icone-github2.png";
import iconeInstagram from "../../../public/imagens/icone-instagram.png";

import Image from 'next/image';

export default function Sobre() {
  return (
    <main className="container_sobre">
        <h1>Conheça a nossa equipe:</h1>
            <div>
                <Image src={fotoFelipeSora} alt="foto de Felipe Sora" className="imagem_integrante"/>
                <div>
                    <p>Nome: Felipe Sora</p>
                    <p>RM: 555462</p>
                    <p>Turma: 1TDSPH</p>
                    <div>
                        <p>Redes Sociais:</p>
                        <div className="div_icones_redes">
                            <a href="https://www.linkedin.com/in/felipesora/" target="_blank"><Image src={iconeLinkedin} alt="icone do Linkedin" className="icones_redes"/></a>
                            <a href="https://github.com/felipesora" target="_blank"><Image src={iconeGithub} alt="icone do Github" className="icones_redes"/></a>
                            <a href="https://www.instagram.com/felipesora_/" target="_blank"><Image src={iconeInstagram} alt="icone do Github" className="icones_redes"/></a>       
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Image src={fotoFelipePizzi} alt="foto de Felipe Pizzinato" className="imagem_integrante"/>
                <div>
                    <p>Nome: Felipe Pizzinato</p>
                    <p>RM: 555141</p>
                    <p>Turma: 1TDSPH</p>
                    <div>
                        <p>Redes Sociais:</p>
                        <div className="div_icones_redes">
                            <a href="https://www.linkedin.com/in/felipe-pizzinato-0b041930b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank"><Image src={iconeLinkedin} alt="icone do Linkedin" className="icones_redes"/></a>
                            <a href="https://github.com/felipepizzinato" target="_blank"><Image src={iconeGithub} alt="icone do Github" className="icones_redes"/></a>
                            <a href="https://www.instagram.com/_pizzinato/?igsh=Z3FoYjhnNmJ5cHR2" target="_blank"><Image src={iconeInstagram} alt="icone do Github" className="icones_redes"/></a>       
                        </div>
                    </div>
                </div>
            </div>

    </main>
  )
}

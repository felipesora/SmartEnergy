"use client";

import React, { useEffect, useState } from 'react';
import { obterSugestaoPorId } from '@/services/sugestoes/api';
import Image from 'next/image';

// Imagens importadas
import lampadasLed from '../../../public/imagens/lampadas-led-530px.jpeg';
import tomadas from '../../../public/imagens/tomada-530px.jpg';
import maquinaLavar from '../../../public/imagens/maquina-lavar-roupas-530px.jpg';
import paineisSolares from '../../../public/imagens/energia-solar-530px.jpg';
import luzesCasa from '../../../public/imagens/luzes-casa-530px.jpg';
import computador from '../../../public/imagens/computador-530px.jpg';

export default function Sugestoes() {

  const [dsSugestao, setDsSugestao] = useState<string>('');
  const [dsSugestao2, setDsSugestao2] = useState<string>('');
  const [dsSugestao3, setDsSugestao3] = useState<string>('');
  const [dsSugestao4, setDsSugestao4] = useState<string>('');
  const [dsSugestao5, setDsSugestao5] = useState<string>('');
  const [dsSugestao6, setDsSugestao6] = useState<string>('');

  
// Carrega as sugestões
useEffect(() => {
    async function fetchSugestao() {
      try {
        const sugestao = await obterSugestaoPorId(1);
        setDsSugestao(sugestao.dsSugestao);
        const sugestao2 = await obterSugestaoPorId(2);
        setDsSugestao2(sugestao2.dsSugestao);
        const sugestao3 = await obterSugestaoPorId(3);
        setDsSugestao3(sugestao3.dsSugestao);
        const sugestao4 = await obterSugestaoPorId(4);
        setDsSugestao4(sugestao4.dsSugestao);
        const sugestao5 = await obterSugestaoPorId(5);
        setDsSugestao5(sugestao5.dsSugestao);
        const sugestao6 = await obterSugestaoPorId(6);
        setDsSugestao6(sugestao6.dsSugestao);
      } catch (error) {
        console.error('Erro ao buscar sugestão:', error);
      }
    }

    fetchSugestao();
  }, []);

  if (!dsSugestao) {
    return <p className='mensagem_carregando'>Carregando...</p>;
  }

  return (
    
    <main className='container_sugestoes'>
      <h1>Sugestões para Economizar Energia e Preservar o Meio Ambiente</h1>
      <p>
        Aqui estão algumas dicas personalizadas para reduzir seu consumo de energia e ajudar o
        planeta. Com pequenas mudanças em seus hábitos, você pode fazer uma grande diferença.
      </p>
      <div className='conjunto_sugestoes'>
        <div>
          <Image src={lampadasLed} alt="foto de lâmpadas led" className='imagem_sugestao'/>
          <p>{dsSugestao}</p>
        </div>

        <div>
          <Image src={tomadas} alt="foto de tomadas" className='imagem_sugestao'/>
          <p>{dsSugestao2}</p>
        </div>

        <div>
          <Image src={maquinaLavar} alt="foto de uma máquina de lavar roupa" className='imagem_sugestao'/>
          <p>{dsSugestao3}</p>
        </div>
      </div>

      <div className='conjunto_sugestoes conjunto_sugestoes2'>
        <div>
          <Image src={paineisSolares} alt="foto de painéis solares" className='imagem_sugestao'/>
          <p>{dsSugestao4}</p>
        </div>

        <div>
          <Image src={luzesCasa} alt="foto de uma casa com as luzes acesas" className='imagem_sugestao'/>
          <p>{dsSugestao5}</p>
        </div>

        <div>
          <Image src={computador} alt="foto de um computador ligado" className='imagem_sugestao'/>
          <p>{dsSugestao6}</p>
        </div>
      </div>
    </main>
  );
}

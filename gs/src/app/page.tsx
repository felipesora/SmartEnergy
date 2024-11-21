"use client";

import React, { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Executa a animação quando o componente for montado
    const elements = document.querySelectorAll('.animated-content');
    elements.forEach((element) => {
      element.classList.add('visible');
    });

    // Carrega o script do TypeBot
    const typebotInitScript = document.createElement("script");
    typebotInitScript.type = "module";
    typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js'
    
    Typebot.initBubble({
      typebot: "my-typebot-1gxcx0q",
      theme: { button: { backgroundColor: "#0E343B" } },
    });
    `;
    document.body.append(typebotInitScript);

  }, []);

  

  return (
    <main>
      <div className="parte1_home animated-content">
        <h1>
          Transforme sua <span>Energia.</span>
        </h1>
        <h1>
          Transforme o <span>Futuro!</span>
        </h1>
        <p>
          Em um mundo cada vez mais consciente da necessidade de preservação ambiental, o uso
          inteligente da energia nunca foi tão importante. Nossa plataforma oferece ferramentas
          para monitorar, otimizar e reduzir o consumo energético, proporcionando não apenas
          economia financeira, mas também um impacto positivo no planeta. Junte-se a nós e seja
          parte da transformação energética!
        </p>
      </div>

      <div className="parte2_home animated-content">
        <div>
          <h1>Dê o Primeiro Passo para um Futuro Energético Sustentável</h1>
          <p>
            Descubra como pequenas mudanças podem fazer uma grande diferença. Cadastre-se,
            monitore seu consumo e receba sugestões personalizadas para otimizar sua utilização
            de energia. O futuro começa com a sua ação – e juntos, podemos construir um amanhã
            mais sustentável.
          </p>
        </div>
      </div>
    </main>
  );
}
"use client";

import iconePlanta from "../../../public/imagens/icone-planta.png";
import iconeBalanca from "../../../public/imagens/icone-balanca2.png";
import iconeAlerta from "../../../public/imagens/icone-alerta.png";
import iconeLixeira from "../../../public/imagens/icone-lixo.png";

import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obterDadosConsumoPorId, cadastrarDadosConsumo, excluirDadosConsumo } from "@/services/dados-consumo/api";
import type { DadosConsumo } from "@/services/dados-consumo/api";

export default function DadosConsumo() {
  const [dadosConsumoUsuario, setDadosUsuario] = useState<DadosConsumo | DadosConsumo[] | null>(null);
  const [ano, setAno] = useState<string>("");  // Inicializando com string vazia
  const [mes, setMes] = useState<string>(""); 
  const [kwh, setKwh] = useState<string>(""); // Inicializando com string vazia
  const router = useRouter();
  
  useEffect(() => {
    const userId = localStorage.getItem("idUsuario");
  
    if (!userId) {
      alert("Para acessar essa página é necessário uma conta! Redirecionando para a página de login.");
      router.push("/login");
      return;
    }
  
    async function fetchDadosConsumoUsuario() {
      try {
        const idUsuario = userId ? parseInt(userId, 10) : 0;
        const dadosConsumo = await obterDadosConsumoPorId(idUsuario);
        console.log(dadosConsumo);
  
        // Verifique se o retorno é vazio ou nulo
        if (!dadosConsumo || (Array.isArray(dadosConsumo) && dadosConsumo.length === 0)) {
          setDadosUsuario([]);  // Define um array vazio para quando não houver dados
          return;
        }
  
        setDadosUsuario(dadosConsumo);
      } catch (error) {
        console.error("Erro ao carregar os dados de consumo do usuário:", error);
        // Não precisa mais exibir o alerta se não houver dados
      }
    }
  
    fetchDadosConsumoUsuario();
  }, [router]);

  async function handleCadastroDadosConsumo(event: React.FormEvent) {
    event.preventDefault();
  
    const userId = localStorage.getItem("idUsuario"); // Recuperando o idUsuario do localStorage
  
    if (!userId) {
      alert("Usuário não encontrado. Por favor, faça login novamente.");
      return;
    }
  
    // Convertendo 'ano' e 'kwh' para 'number' se possível
    const anoConvertido = Number(ano);
    const kwhConvertido = Number(kwh);
  
    // Verificando se as conversões deram certo
    if (isNaN(anoConvertido) || isNaN(kwhConvertido)) {
      alert("Por favor, insira valores válidos para o ano e kWh.");
      return;
    }
  
    const dadosConsumo = {
      idUsuario: parseInt(userId, 10),  // Passando o idUsuario para o cadastro
      anoConsumo: anoConvertido,  // Passando ano como número
      mesConsumo: mes,
      kwhConsumo: kwhConvertido,  // Passando kwh como número
    };
  
    try {
      await cadastrarDadosConsumo(dadosConsumo);
      alert("Dados cadastrados com sucesso!");
  
      // Recarregar a página para mostrar os dados atualizados
      window.location.reload();  // Recarrega a página
  
    } catch (error) {
      console.error("Erro ao cadastrar:", error); 
      alert("Erro ao cadastrar! Verifique os dados e tente novamente.");
    }
  }

    // Função para excluir dados de consumo
    async function handleExcluirDadosConsumo(idConsumo: number) {
        const confirmarExclusao = window.confirm("Você tem certeza que deseja excluir este dado de consumo?");
        if (confirmarExclusao) {
        try {
            // Chama a função de exclusão da API
            await excluirDadosConsumo(idConsumo);
            
            // Atualiza a lista de dados após exclusão
            setDadosUsuario((prevDados: DadosConsumo | DadosConsumo[] | null) => {
            if (Array.isArray(prevDados)) {
                return prevDados.filter(dado => dado.idConsumo !== idConsumo);
            }
            return prevDados;
            });
            
            alert("Dado excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir dado:", error);
            alert("Erro ao excluir dado de consumo. Tente novamente mais tarde.");
        }
        }
    }
  

  return (
    <main className="container_dados_consumo">
      <div>
        <h1>Seu Consumo de Energia, Analisado de Forma Simples</h1>
        <p>Acompanhe de perto seu consumo de energia e descubra maneiras de economizar. Insira seus dados mensais e visualize sua média diária para entender melhor como usar energia de forma mais eficiente.</p>
        <form onSubmit={handleCadastroDadosConsumo} className="form_dados_consumo">
          <div className="div_form_dados_consumo">
            <label htmlFor="ano" className="texto_form">Ano:</label>
            <input
                type="text"
                id="ano"
                value={ano}  // Agora, o valor começa vazio
                className="input input_cadastro"
                onChange={(e) => setAno(e.target.value)}
                required
                />
          </div>
          <div className="div_form_dados_consumo">
            <label htmlFor="mes" className="texto_form">Mês:</label>
            <select name="mes" id="idMesConsumo" required value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="" disabled>Selecione um mês</option>
              <option value="Janeiro">Janeiro</option>
              <option value="Fevereiro">Fevereiro</option>
              <option value="Março">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
              <option value="Julho">Julho</option>
              <option value="Agosto">Agosto</option>
              <option value="Setembro">Setembro</option>
              <option value="Outubro">Outubro</option>
              <option value="Novembro">Novembro</option>
              <option value="Dezembro">Dezembro</option>
            </select>
          </div>
          <div className="div_form_dados_consumo">
            <label htmlFor="kwh" className="texto_form">kWh:</label>
            <input
                type="text"
                id="kwh"
                value={kwh}  // Agora, o valor começa vazio
                className="input input_cadastro"
                onChange={(e) => setKwh(e.target.value)}
                required
                />
          </div>

          <div>
            <button className="botao_consumo">Enviar</button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Categoria de consumo</th>
              <th>kWh por dia</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consumo Baixo</td>
              <td>Até 5 kWh</td>
              <td>Parabéns! Seu consumo está em um nível sustentável.</td>
            </tr>
            <tr>
              <td>Consumo Moderado</td>
              <td>Entre 5 kWh e 10 kWh</td>
              <td>Atenção! Você está consumindo de forma moderada. Considere otimizar o uso de alguns aparelhos.</td>
            </tr>
            <tr>
              <td>Consumo Alto</td>
              <td>Acima de 10 kWh</td>
              <td>Alerta! Seu consumo está alto. Reduza o uso de energia para ajudar o planeta e economizar.</td>
            </tr>
          </tbody>
        </table>

        <div>
            {/* Verificando se dadosConsumoUsuario não é nulo e é um array */}
            {dadosConsumoUsuario && Array.isArray(dadosConsumoUsuario) && dadosConsumoUsuario.map((dado, index) => {
                const mediaDiaria = dado.kwhConsumo / 30;  // Calculando a média diária
                
                let categoriaConsumo = '';
                let corCategoria = '';
                let icone = null; // Variável para armazenar o ícone correspondente

                // Definindo a categoria de consumo e o ícone correspondente
                if (mediaDiaria <= 5) {
                categoriaConsumo = 'Consumo Baixo';
                corCategoria = '#7DCEA0';  // Cor para Consumo Baixo
                icone = iconePlanta;  // Ícone para Consumo Baixo
                } else if (mediaDiaria > 5 && mediaDiaria < 10) {
                categoriaConsumo = 'Consumo Moderado';
                corCategoria = '#F1C40F';  // Cor para Consumo Moderado
                icone = iconeBalanca;  // Ícone para Consumo Moderado
                } else {
                categoriaConsumo = 'Consumo Alto';
                corCategoria = '#FB0000';  // Cor para Consumo Alto
                icone = iconeAlerta;  // Ícone para Consumo Alto
                }

                return (
                <div key={index} className="div_dados_consumo">
                    {/* Exibindo o ícone correspondente com a tag Image do Next.js */}
                    {icone && <Image src={icone} alt={categoriaConsumo} className="icones_dados_consumo"/>}
                    <div>
                        <p className="texto_dados_consumo">Ano: {dado.anoConsumo}</p>
                        <p className="texto_dados_consumo">Mês: {dado.mesConsumo}</p>
                        <p className="texto_dados_consumo">Média diária: {mediaDiaria.toFixed(2)} kWh</p>  {/* Exibindo a média diária */}
                        <div>
                            <p>Categoria: <span style={{ color: corCategoria }}>{categoriaConsumo}</span></p> {/* Exibindo a categoria com cor */}
                            <button onClick={() => handleExcluirDadosConsumo(dado.idConsumo)}><Image src={iconeLixeira} alt="icone de uma lixeira" className="icone_lixo" /></button>
                        </div>
                    </div>
                        
                </div>
                );
            })}
        </div>



      </div>
    </main>
  );
}

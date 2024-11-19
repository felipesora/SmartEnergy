const API_URL_DADOS_CONSUMO = "http://localhost:8080/dados-consumo";

export interface DadosConsumo{
    anoConsumo: number;
    idUsuario: number;
    idConsumo: number;
    kwhConsumo: number;
    mesConsumo: string;
}

// Função para pegar dados de consumo de um usuário

export async function obterDadosConsumoPorId(idUsuario: number): Promise<DadosConsumo> {
    try {
        const response = await fetch(`${API_URL_DADOS_CONSUMO}/${idUsuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os dados de consumo do usuário.");
        }

        return await response.json();
    } catch (error) {
        // console.error("Erro ao buscar usuário por ID:", error);
        throw error;
    }
}

// Função para cadastrar dados de consumo de um usuário

export async function cadastrarDadosConsumo(usuario: {anoConsumo: number; mesConsumo: string; kwhConsumo: number}){
    try {
        const response = await fetch(API_URL_DADOS_CONSUMO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(usuario),
        });

        if(!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao cadastrar dados de consumo do usuário:", errorText);
            throw new Error(`Erro ao cadastrar dados de consumo do usuário: ${errorText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erro ao cadastrar dados de consumo do usuário:", error);
        throw error;
    }
}

// Função para excluir dados de consumo
export async function excluirDadosConsumo(idConsumo: number) {
    try {
      const response = await fetch(`${API_URL_DADOS_CONSUMO}/${idConsumo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir os dados de consumo.");
      }
    } catch (error) {
      console.error("Erro ao excluir dados de consumo:", error);
      throw error;
    }
  }
const API_URL_SUGESTOES = "http://localhost:8080/sugestoes";

// Interface para Sugestões
export interface Sugestoes {
    idSugestao: number;
    dsSugestao: string;
}

// Função para obter a sugestão pelo ID
export async function obterSugestaoPorId(idSugestao: number): Promise<Sugestoes> {
    try {
        const response = await fetch(`${API_URL_SUGESTOES}/${idSugestao}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os dados de sugestões.");
          }
      
          return await response.json(); // Retorna os dados de sugestões
    } catch (error) {
        console.error("Erro ao buscar sugestão por ID:", error);
        throw error;
    }
}
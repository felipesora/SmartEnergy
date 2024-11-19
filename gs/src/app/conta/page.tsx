"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { excluirUsuarioPorId, obterUsuarioPorId, Usuario } from "@/services/conta/api";


export default function Conta() {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("idUsuario");

        if (!userId) {
            alert("Usuário não logado! Redirecionando para a página de login.")
            router.push("/login");
            return;
        }

        async function fetchUsuario() {
            try {
                const idUsuario = userId ? parseInt(userId, 10): 0;

                const dadosUsuario = await obterUsuarioPorId(idUsuario);
                setUsuario(dadosUsuario);

            } catch (error) {
                console.error("Erro ao carregar os dados do usuário:", error);
                alert("Erro ao carregar dados do usuário. Tente novamente mais tarde.");
            }
        }

        fetchUsuario();
    }, [router]);

    function handleEditarConta() {
        router.push("/conta/editar-conta")
    }

    function handleLogout() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("idUsuario");
        }
        router.push("/")
    }

    async function handleExcluirConta() {
        if (confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.")){
            try {
                const userId = localStorage.getItem("idUsuario");
                if (!userId) {
                    alert("Usuário não encontrado.");
                    return;
                }

                const idUsuario = parseInt(userId, 10);
                await excluirUsuarioPorId(idUsuario);
                localStorage.removeItem("idUsuario");
                alert("Conta excluída com sucesso.");
                router.push("/");

            } catch (error) {
                console.error("Erro ao excluir a conta:", error);
                alert("Erro ao excluir a conta. Tente novamente.");
            }
        }
    }

    if (!usuario) {
        return <p className='mensagem_carregando'>Carregando...</p>;
      }

      

  return (
    <main className="main_login">
        <div className="container_conta">
            <h1>Dados da Conta</h1>
            <p>Abaixo estão seus dados cadastrados no sistema:</p>
            <ul>
                <li><strong>Nome:</strong> <span>{usuario.nomeUsuario}</span></li>
                <li><strong>Email:</strong> <span>{usuario.emailUsuario}</span></li>
                <li><strong>Senha:</strong> <span>{usuario.senhaUsuario}</span></li>
            </ul>
            <div className="div_botoes_conta">
                <button onClick={handleEditarConta} className="botoes_conta botao_editar">Editar</button>
                <button onClick={handleExcluirConta} className="botoes_conta botao_excluir">Excluir</button>
                <button onClick={handleLogout} className="botoes_conta botao_sair">Sair</button>
            </div>
        </div>
    </main>
  )
}

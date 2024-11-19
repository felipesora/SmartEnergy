"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { atualizarUsuarioPorId, Usuario, obterUsuarioPorId } from  "@/services/conta/api";

export default function EditarConta() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("idUsuario");

        if (!userId) {
            alert("Usuário não logado. Redirecionando para a página de login.");
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
            } finally {
                setLoading(false); 
            }
        }

        fetchUsuario();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (usuario) {
            try {
                await atualizarUsuarioPorId(usuario.idUsuario, usuario);
                alert("Dados atualizados com sucesso!");
                router.push("/conta")
            } catch (error) {
                console.error("Erro ao atualizar dados do usuário:", error);
                alert("Erro ao atualizar dados do usuário. Tente novamente.");
            }
        } else {
            alert("Nenhum dado de usuário encontrado para atualização.");
        }
    };

    if (loading) {
        return <p className='mensagem_carregando'>Carregando...</p>; 
      }

    if (!usuario) {
    return <p className='mensagem_carregando'>Nenhum usuário encontrado.</p>; 
    }


  return (
    <main className="main_login">
        <div className="container_conta">
            <h1>Atualização de Conta</h1>
            <p>Atualize os campos abaixo:</p>
            <form onSubmit={handleSubmit}>
                    <div className="texto_input_form">
                        <label htmlFor="idNome"><strong>Nome:</strong></label>
                        <input
                            type="text"
                            name="nome"
                            id="idNome"
                            className="input"
                            value={usuario.nomeUsuario}
                            required
                            onChange={(e) => setUsuario({ ...usuario, nomeUsuario: e.target.value })}
                        />
                    </div>


                    <div className="texto_input_form"> 
                        <label htmlFor="idEmail"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name="email"
                            id="idEmail"
                            className="input"
                            value={usuario.emailUsuario}
                            required
                            onChange={(e) => setUsuario({ ...usuario, emailUsuario: e.target.value })}
                        />
                    </div>

                    <div className="texto_input_form">
                        <label htmlFor="idSenha"><strong>Senha:</strong></label>
                        <input
                            type="text"
                            name="senha"
                            id="idSenha"
                            className="input"
                            value={usuario.senhaUsuario}
                            required
                            onChange={(e) => setUsuario({ ...usuario, senhaUsuario: e.target.value })}
                        />
                    </div>

                    <div>
                        <button type="submit" className="button_login">Atualizar</button>
                    </div>
            </form>
        </div>
    </main>
  )
}

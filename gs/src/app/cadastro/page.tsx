"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarUsuario } from "@/services/conta/api";

export default function Cadastro() {
    useEffect(() => {
        // Executa a animação quando o componente for montado
        const elements = document.querySelectorAll('.animated-content');
        elements.forEach((element) => {
          element.classList.add('visible');
        });
      }, []);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastroSuccess, setCadastroSuccess] = useState(false);
    const [cadastroError, setCadastroError] = useState(""); // Estado para a mensagem de erro
    const router = useRouter();

    async function handleCadastro(event: React.FormEvent) {
        event.preventDefault();
    
        const usuario = {
            emailUsuario: email,
            nomeUsuario: nome,
            senhaUsuario: senha,
        };
    
        try {
            await cadastrarUsuario(usuario); // Tenta cadastrar o usuário
            setCadastroSuccess(true); // Exibe a mensagem de sucesso
            setCadastroError(""); // Limpa qualquer mensagem de erro
    
            // Redireciona após 2 segundos
            setTimeout(() => {
                router.push("/login");
            }, 2000);
    
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
    
            setCadastroSuccess(false); // Garante que a mensagem de sucesso não apareça
            
            // Loga o erro para entender a estrutura
            console.log(error);
    
            // Verifica a estrutura do erro e compara com a mensagem de "Email já cadastrado"
            const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido!";
    
            if (errorMessage.includes("Email já cadastrado")) {
                setCadastroError("Este email já está cadastrado.");
            } else {
                setCadastroError(errorMessage); // Exibe erro genérico se não for "Email já cadastrado"
            }
        }
    }

    return (
        <main className="main_login animated-content">
            <div className="container_login">
                <h1>Crie uma Conta</h1>
                <div className="div_texto_login link_form_cadastro">
                    <p>Crie um cadastro para ter uma experiência melhor ao usar nosso site!</p> 
                    <p>Já possui uma conta?{" "}<Link href="/login" className="link_form">Faça login aqui</Link></p>
                </div>

                {cadastroSuccess && (
                    <p className="sucesso_login">Cadastro realizado com sucesso!</p>  // Mensagem de sucesso
                )}

                {cadastroError && (
                    <p className="erro_login">{cadastroError}</p>  // Mensagem de erro
                )}

                <form onSubmit={handleCadastro}>
                    <div className="texto_input_form">
                        <label htmlFor="nome" className="texto_form_cadastro">Nome Completo:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            className="input input_cadastro"
                            onChange={(e) => setNome(e.target.value)}
                            required
                            placeholder="Digite seu nome completo"
                        />
                    </div>

                    <div className="texto_input_form">
                        <label htmlFor="email" className="texto_form_cadastro">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="input input_cadastro"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div className="texto_input_form">
                        <label htmlFor="senha" className="texto_form_cadastro">Senha:</label>
                        <input
                            type="text"
                            id="senha"
                            value={senha}
                            className="input input_cadastro"
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <p className="campos_obrigatorios">*Todos os campos são obrigatórios.</p>
                    <div>
                        <button type="submit" className="button_login button_cadastro">Cadastrar-se</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
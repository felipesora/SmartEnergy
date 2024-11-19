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
    const router = useRouter();

    async function handleCadastro(event: React.FormEvent) {
        event.preventDefault();

        const usuario = {
            emailUsuario: email,
            nomeUsuario: nome,
            senhaUsuario: senha,
        };

        try {
            await cadastrarUsuario(usuario);
            alert("Cadastro realizado com sucesso!");
            router.push("/login");

        } catch (error) {
            console.error("Erro ao cadastrar:", error); 
            alert("Erro ao cadastrar! Verifique os dados e tente novamente.");
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
  )
}

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/conta/api";

export default function Login() {
  useEffect(() => {
    // Executa a animação quando o componente for montado
    const elements = document.querySelectorAll('.animated-content');
    elements.forEach((element) => {
      element.classList.add('visible');
    });
  }, []);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
            const result = await login(email, senha);

            if (result.success) {
                alert("Login realizado com sucesso!");
                router.push("/");
            } else {
                alert(result.message || "Usuário ou senha incorretos!");
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Tente novamente.");
        }
    }

  return (
    <main className="main_login animated-content">
        <div className="container_login">
            <h1>Entre na Conta</h1>
            <div className="div_texto_login">
                <p>Entre na sua conta para ter uma experiência melhor ao usar nosso site!</p>
                <p>Ainda não possui uma conta?{" "}<Link href="/cadastro" className="link_form">Cadastre-se aqui</Link></p>
            </div>
            <form onSubmit={handleLogin} className="form_login">
            <div className="texto_input_form">
                <label htmlFor="email" className="texto_form">Email:</label>
                  <input
                    type="email"
                    value={email}
                    className="input_login"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
            </div>
              <div className="texto_input_form">
                  <label htmlFor="senha" className="texto_form">Senha:</label>
                  <input
                    type="password"
                    value={senha}
                    className="input_login"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
              </div>
              <div>
                <button type="submit" className="button_login">Entrar</button>
              </div>
            </form>
        </div>
    </main>
  )
}

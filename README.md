[README.md](https://github.com/user-attachments/files/32244020/README.md)
# Painel do Vendedor — Cançao

Painel de metas, carteira e fechamento do dia. É **uma página só**: o vendedor abre o
link no celular, importa o Excel que o escritório manda e todo o cálculo acontece
dentro do aparelho dele.

---

## Publicar no GitHub Pages

1. Crie um repositório (pode ser **privado**; o Pages funciona igual em conta paga,
   e em conta grátis o repositório precisa ser público).
2. Suba estes arquivos na **raiz** do repositório:

   ```
   index.html
   sw.js
   manifest.webmanifest
   icon-192.png
   icon-512.png
   ```

3. No repositório: **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `main` / pasta `/ (root)` → **Save**
4. Em um ou dois minutos o endereço aparece na mesma tela, no formato
   `https://SUACONTA.github.io/NOMEDOREPO/`.
5. Mande esse link para os vendedores.

---

## Publicar uma versão nova

Quando eu te mandar um `index.html` atualizado:

1. Substitua o `index.html` no repositório.
2. **Abra o `sw.js` e troque o número da versão** na primeira linha de código:

   ```js
   var CACHE = "painel-cancao-v3.3";   →   var CACHE = "painel-cancao-v3.4";
   ```

   Esse passo é obrigatório. É ele que avisa o celular de que tem coisa nova.
3. Faça o commit.

No celular do vendedor aparece uma tarja escura embaixo — *"Nova versão do painel
disponível"* — com o botão **Atualizar**. Ele toca quando quiser: a tela não recarrega
sozinha no meio de um pedido.

**Atualizar não apaga nada.** Metas, visitas, pedidos, cadastro e a senha do
escritório continuam no aparelho.

---

## O que fica guardado no celular

Tudo o que o vendedor cria fica **só no aparelho dele**, no armazenamento do
navegador. Nada é enviado para servidor nenhum, e um vendedor **nunca** enxerga ou
sobrescreve o dado do outro — mesmo todos usando o mesmo link.

| Guardado | Separado por |
|---|---|
| Dados de venda (a planilha importada) | vendedor |
| Metas do mês e a trava | vendedor + mês |
| Visitas, motivos e anotações | vendedor + mês |
| Pedidos anotados | vendedor + mês |
| Marcas de "visitado" da aba A recuperar | vendedor + mês |
| Cadastro (telefone, rota, dia de visita) | vendedor |
| Fechamentos dos meses | vendedor |
| Senha do escritório, tema, fonte grande | aparelho |

O nome do vendedor vem do rodapé do export do BI (*"Filtros aplicados: Representante
é ..."*). Se dois vendedores usarem o mesmo celular, cada um tem o seu espaço e a aba
**Metas** mostra a lista para alternar entre eles.

---

## Os dois cuidados que importam

**1. Peça para o vendedor adicionar à tela de início.**
No iPhone o Safari **apaga os dados** de sites que ficam alguns dias sem uso. Depois de
adicionar à Tela de Início isso deixa de acontecer, o painel abre em tela cheia e
funciona sem internet. O próprio painel mostra esse aviso na primeira abertura.

- iPhone: botão **Compartilhar** → **Adicionar à Tela de Início**
- Android: menu **⋮** → **Adicionar à tela inicial**

**2. O backup é a rede de segurança.**
Em **Metas → Backup deste aparelho** o vendedor copia um texto e manda no WhatsApp
dele mesmo. Se trocar de celular ou limpar o navegador, é só colar de volta. O painel
já guarda uma cópia automática a cada importação.

---

## Rotina do dia

| Quando | O que acontece |
|---|---|
| Início do mês | O vendedor cadastra as metas **uma vez** e toca em *Confirmar e travar o mês*. Depois disso só a senha do escritório abre para editar. |
| Toda manhã | O escritório manda o Excel; o vendedor toca em **Importar Excel**. Isso substitui **só as vendas** — nenhuma meta é alterada ou apagada. |
| Durante o dia | Ele trabalha pelo **Roteiro**, registra a visita com o motivo e monta o pedido dentro do cliente. |
| Fim do dia | A aba **Resumo do dia** monta o fechamento sozinho e ele manda no WhatsApp do supervisor. |
| Virada do mês | As metas começam zeradas — cada mês tem as suas. O mês anterior fica guardado. |

---

## Sobre o arquivo do BI

O painel lê o export em tabela cruzada com as colunas:

`CLIENTE` · `CD.CLIENTE` · `GRUPO` · `CD.PRODUTO` (quando houver) · `PRODUTO`
e, por mês, `Volume` e `Faturamento`.

Linhas de subtotal (`Total`) e o rodapé de filtros são descartados.
Exporte **um arquivo por representante**: se o BI cortar linhas por volume, o painel
avisa que o export veio incompleto.

Os **grupos de meta** (Bandeja, Empanados, Vegetais, Pão de Queijo, Batata, IQF,
Tilápia, Isca de Tilápia, Lasanhas) são montados por cima do `GRUPO`, e podem ser
conferidos e ajustados em **Metas → Grupos de meta**.

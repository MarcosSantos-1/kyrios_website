import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "../components/LegalLayout";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Termos de Uso — Kyrios Impressão 3D",
  description:
    "Termos de uso da plataforma Kyrios Impressão 3D: condições de pedido, prazos, pagamento, devolução, conta do cliente e responsabilidades.",
};

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos Termos",
    body: (
      <>
        <p>
          Este documento estabelece os termos e condições para uso do site, do catálogo e dos serviços oferecidos pela
          <strong> Kyrios Impressão 3D </strong> (“Kyrios”, “nós”). Ao navegar pelo site, solicitar um orçamento, criar uma
          conta de cliente ou efetuar um pedido, você (“cliente”, “você”) declara ter lido, entendido e concordado
          integralmente com estes Termos de Uso.
        </p>
        <p>
          Se você não concorda com algum dos pontos a seguir, recomendamos não utilizar a plataforma.
        </p>
      </>
    ),
  },
  {
    id: "servicos",
    title: "Serviços oferecidos",
    body: (
      <>
        <p>
          A Kyrios oferece serviços de impressão 3D personalizada (FDM), incluindo: modelagem sob encomenda, impressão a
          partir de arquivos enviados pelo cliente ou de modelos públicos (como o MakerWorld), pós-processamento,
          embalagem e envio.
        </p>
        <p>
          O catálogo apresentado no site é meramente referencial. Cada pedido é confirmado por escrito (via WhatsApp ou
          área do cliente) antes de iniciar a produção.
        </p>
      </>
    ),
  },
  {
    id: "pedidos",
    title: "Pedidos, orçamentos e prazos",
    body: (
      <>
        <p>
          Os preços exibidos no catálogo são valores <em>a partir de</em> e podem variar conforme tamanho, complexidade,
          material e cor escolhidos. O valor final é confirmado no orçamento.
        </p>
        <p>
          Os prazos informados (em dias úteis) começam a contar a partir da confirmação do pagamento e aprovação do
          modelo. Atrasos por falha de matéria-prima, equipamento ou transportadora serão comunicados o quanto antes.
        </p>
        <p>
          Para pedidos personalizados, o cliente recebe um <strong>preview do modelo</strong> antes do início da impressão. A
          aprovação por escrito é necessária para iniciar a produção.
        </p>
      </>
    ),
  },
  {
    id: "pagamento",
    title: "Pagamento",
    body: (
      <>
        <p>
          Aceitamos pagamento via Pix, cartão de crédito e boleto bancário. Pedidos personalizados podem exigir uma
          reserva (sinal) para entrar na fila de produção, com o saldo cobrado antes do envio.
        </p>
        <p>
          Quando o site evoluir para um ambiente de e-commerce com checkout próprio, o processamento dos pagamentos
          poderá ser realizado por gateways parceiros (por exemplo, Stripe, Mercado Pago ou Asaas). Nessa hipótese, os
          dados financeiros são tratados diretamente pelo gateway, sob suas próprias políticas de segurança.
        </p>
      </>
    ),
  },
  {
    id: "envio",
    title: "Envio e entrega",
    body: (
      <>
        <p>
          Enviamos para todo o Brasil via Correios ou transportadoras parceiras. O frete é calculado caso a caso e
          confirmado no orçamento. Após o envio, o cliente recebe o código de rastreamento.
        </p>
        <p>
          Para São Paulo capital e região, oferecemos opções de entrega rápida (motoboy ou retirada combinada).
        </p>
      </>
    ),
  },
  {
    id: "trocas",
    title: "Trocas, devoluções e arrependimento",
    body: (
      <>
        <p>
          Por se tratar de produtos personalizados, fabricados sob demanda, <strong>não há direito de arrependimento</strong>
          conforme o art. 49 do CDC quando o pedido é executado conforme aprovação do cliente.
        </p>
        <p>
          Em caso de defeito de fabricação, dano de transporte ou peça em desacordo com o aprovado, o cliente pode
          solicitar reparo ou nova impressão sem custo adicional em até <strong>7 dias corridos</strong> após o recebimento,
          mediante registro fotográfico.
        </p>
      </>
    ),
  },
  {
    id: "propriedade",
    title: "Propriedade intelectual e arquivos enviados",
    body: (
      <>
        <p>
          O cliente declara que tem direito de uso sobre qualquer arquivo, modelo, marca ou imagem enviado à Kyrios. A
          Kyrios <strong>não se responsabiliza</strong> por eventual infração de direitos de terceiros decorrente de
          conteúdo enviado pelo cliente.
        </p>
        <p>
          Os arquivos enviados são utilizados exclusivamente para execução do pedido contratado e não são
          compartilhados com terceiros sem autorização. O cliente pode solicitar a exclusão dos arquivos a qualquer
          momento.
        </p>
      </>
    ),
  },
  {
    id: "conta",
    title: "Conta do cliente e área restrita",
    body: (
      <>
        <p>
          Em uma próxima fase da plataforma, será disponibilizada uma <strong>área do cliente</strong> com histórico de
          pedidos, status de produção, comprovantes de pagamento, comentários e avaliações. O acesso será protegido por
          credenciais individuais.
        </p>
        <p>
          O cliente é responsável por manter a confidencialidade de suas credenciais e por todas as ações realizadas
          em sua conta. A Kyrios pode suspender contas em caso de uso indevido, fraude ou violação destes Termos.
        </p>
      </>
    ),
  },
  {
    id: "comunicacao",
    title: "Comunicação e atualizações de pedido",
    body: (
      <>
        <p>
          Ao realizar um pedido, o cliente autoriza a Kyrios a enviar notificações relativas ao status (em projeto, em
          produção, despachado para entrega, entregue) por WhatsApp, e-mail e/ou através da própria plataforma.
        </p>
        <p>
          Comunicações de marketing ou novidades são opt-in: só serão enviadas mediante consentimento expresso.
        </p>
      </>
    ),
  },
  {
    id: "limitacao",
    title: "Limitação de responsabilidade",
    body: (
      <>
        <p>
          A Kyrios responde por danos diretos comprovadamente causados por falhas em seus produtos ou serviços, limitados
          ao valor pago no pedido. Não nos responsabilizamos por danos indiretos, lucros cessantes ou perdas decorrentes
          de uso inadequado das peças impressas.
        </p>
        <p>
          As peças produzidas em FDM têm limites técnicos de resistência, precisão e acabamento, que são esclarecidos no
          orçamento sempre que relevante.
        </p>
      </>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações destes termos",
    body: (
      <>
        <p>
          Estes Termos podem ser revisados conforme evolução da plataforma (em especial com o lançamento do módulo de
          e-commerce e área do cliente). A versão vigente é sempre a publicada nesta página, com data de atualização
          indicada no topo.
        </p>
      </>
    ),
  },
  {
    id: "contato-foro",
    title: "Contato e foro",
    body: (
      <>
        <p>
          Dúvidas, solicitações ou reclamações podem ser enviadas pelo WhatsApp <strong>(11) 99379-6258</strong> ou pelo
          e-mail <strong>contato@kyrios3d.com</strong>.
        </p>
        <p>
          Estes Termos são regidos pelas leis brasileiras. Para questões que não sejam resolvidas amigavelmente, fica
          eleito o foro da comarca de São Paulo — SP.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-ink">
      <SiteHeader />
      <LegalDocument
        eyebrow="Documento legal"
        title="Termos de Uso"
        intro="Estes Termos descrevem como funcionam os pedidos, prazos, pagamentos, conta do cliente e demais condições de uso da Kyrios Impressão 3D. Leia com atenção — eles foram escritos pra serem claros e justos."
        updatedAt="24 de maio de 2026"
        sections={sections}
        footerNote={
          <p>
            Quer falar com a gente sobre estes Termos? Manda mensagem no{" "}
            <a href="https://wa.me/5511993796258" className="font-semibold text-tealDeep underline-offset-2 hover:underline">
              WhatsApp
            </a>{" "}
            ou veja também a nossa{" "}
            <Link href="/privacidade" className="font-semibold text-tealDeep underline-offset-2 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        }
      />
      <SiteFooter />
    </main>
  );
}

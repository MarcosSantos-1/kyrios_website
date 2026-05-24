import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "../components/LegalLayout";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Política de Privacidade — Kyrios Impressão 3D",
  description:
    "Política de Privacidade da Kyrios Impressão 3D em conformidade com a LGPD: como coletamos, usamos e protegemos seus dados pessoais.",
};

const sections: LegalSection[] = [
  {
    id: "introducao",
    title: "Introdução",
    body: (
      <>
        <p>
          A privacidade dos nossos clientes é prioridade. Esta política descreve, em conformidade com a Lei Geral de
          Proteção de Dados (Lei 13.709/2018 — LGPD), quais dados pessoais a Kyrios Impressão 3D coleta, com que
          finalidade, como protege e quais direitos você possui sobre eles.
        </p>
        <p>
          Esta política é aplicável ao site, ao catálogo, à futura área do cliente e ao atendimento por WhatsApp.
        </p>
      </>
    ),
  },
  {
    id: "controlador",
    title: "Quem é o controlador",
    body: (
      <>
        <p>
          A Kyrios Impressão 3D (São Paulo — SP) atua como <strong>controladora</strong> dos dados pessoais coletados
          através de seus canais.
        </p>
        <p>
          Para qualquer assunto relacionado a dados pessoais, entre em contato pelo e-mail
          <strong> contato@kyrios3d.com</strong> ou pelo WhatsApp <strong>(11) 99379-6258</strong>.
        </p>
      </>
    ),
  },
  {
    id: "dados",
    title: "Quais dados coletamos",
    body: (
      <>
        <p>Coletamos apenas o necessário para atender e processar seu pedido:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li><strong>Dados de identificação</strong> — nome, telefone, e-mail.</li>
          <li><strong>Dados de entrega</strong> — endereço completo, ponto de referência.</li>
          <li><strong>Dados de pedido</strong> — descrição, arquivos, fotos de referência, especificações.</li>
          <li><strong>Dados financeiros</strong> — comprovantes de pagamento ou tokens fornecidos por gateways parceiros (não armazenamos número de cartão).</li>
          <li><strong>Dados de navegação</strong> — cookies, IP, dispositivo e páginas visitadas (anonimizados sempre que possível).</li>
          <li><strong>Conta do cliente</strong> — quando lançada, login, senha (criptografada) e histórico de pedidos.</li>
        </ul>
      </>
    ),
  },
  {
    id: "finalidade",
    title: "Como e por que usamos seus dados",
    body: (
      <>
        <p>Seus dados são tratados exclusivamente para:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Atender solicitações de orçamento e produzir os pedidos contratados.</li>
          <li>Enviar atualizações de status (em projeto, em produção, despachado para entrega, entregue).</li>
          <li>Emitir notas, recibos e comprovantes.</li>
          <li>Operar a área do cliente, exibir histórico de pedidos e gerenciar avaliações/comentários.</li>
          <li>Atender obrigações legais, fiscais e regulatórias.</li>
          <li>Melhorar o site e o atendimento (analytics anonimizado).</li>
          <li>Enviar comunicações de marketing — <strong>somente</strong> com consentimento explícito.</li>
        </ul>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "Bases legais",
    body: (
      <>
        <p>O tratamento de dados pela Kyrios é fundamentado nas seguintes bases legais da LGPD:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li><strong>Execução de contrato</strong> — para processar pedidos e atender solicitações.</li>
          <li><strong>Obrigação legal/regulatória</strong> — emissão fiscal, prazos de guarda.</li>
          <li><strong>Legítimo interesse</strong> — segurança, prevenção a fraude, melhoria do serviço.</li>
          <li><strong>Consentimento</strong> — para envio de comunicações de marketing e cookies opcionais.</li>
        </ul>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    body: (
      <>
        <p>
          Não vendemos nem alugamos dados pessoais. Eventualmente compartilhamos dados com:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Transportadoras e Correios, para entregar os pedidos.</li>
          <li>Gateways e processadores de pagamento (quando o checkout próprio for ativado).</li>
          <li>Fornecedores de tecnologia (hospedagem, e-mail transacional, analytics) sob contrato com cláusulas de proteção de dados.</li>
          <li>Autoridades públicas, mediante ordem judicial ou exigência legal.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies e tecnologias similares",
    body: (
      <>
        <p>
          Usamos cookies essenciais para o funcionamento do site (carrinho, login, preferências) e cookies de analytics
          para entender uso agregado. Cookies de marketing dependem do seu consentimento explícito.
        </p>
        <p>
          Você pode bloquear cookies pelo navegador — observe que algumas funcionalidades podem deixar de funcionar
          corretamente.
        </p>
      </>
    ),
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    body: (
      <>
        <p>Mantemos dados pelo menor tempo necessário a cada finalidade:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li><strong>Pedidos</strong> — durante a relação contratual e pelo prazo legal de guarda (5 anos para fins fiscais).</li>
          <li><strong>Conta do cliente</strong> — enquanto a conta estiver ativa; após exclusão, removida em até 30 dias.</li>
          <li><strong>Arquivos de modelagem</strong> — até 12 meses após a entrega, salvo solicitação de exclusão imediata.</li>
          <li><strong>Logs de acesso</strong> — pelo prazo legal mínimo de 6 meses (Marco Civil da Internet).</li>
        </ul>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança da informação",
    body: (
      <>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados, incluindo: criptografia em
          trânsito (HTTPS), controle de acesso, backups regulares e armazenamento em provedores reconhecidos.
        </p>
        <p>
          Em caso de incidente de segurança que possa causar risco relevante aos titulares, comunicaremos a Autoridade
          Nacional de Proteção de Dados (ANPD) e os clientes afetados no prazo previsto em lei.
        </p>
      </>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos como titular",
    body: (
      <>
        <p>A LGPD garante a você os seguintes direitos sobre seus dados:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Confirmação e acesso aos dados que tratamos sobre você.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
          <li>Portabilidade dos dados.</li>
          <li>Revogação do consentimento.</li>
          <li>Informação sobre compartilhamentos realizados.</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, basta enviar um pedido para
          <strong> contato@kyrios3d.com</strong>. Respondemos em até 15 dias corridos.
        </p>
      </>
    ),
  },
  {
    id: "criancas",
    title: "Crianças e adolescentes",
    body: (
      <>
        <p>
          A Kyrios não direciona seus serviços a crianças ou adolescentes. Pedidos para menores devem ser feitos pelos
          responsáveis legais, que respondem pelos dados informados.
        </p>
      </>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    body: (
      <>
        <p>
          Esta Política pode ser atualizada com a evolução da plataforma — em especial com o lançamento do checkout, da
          área do cliente e de novas funcionalidades. A versão vigente é sempre a publicada nesta página, com a data de
          atualização indicada no topo.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] text-ink">
      <SiteHeader />
      <LegalDocument
        eyebrow="Documento legal"
        title="Política de Privacidade"
        intro="Como tratamos seus dados pessoais, com base na LGPD. Sem letras miúdas, sem pegadinha — só o necessário pra você ter clareza de como funciona."
        updatedAt="24 de maio de 2026"
        sections={sections}
        footerNote={
          <p>
            Tem dúvida sobre como tratamos seus dados? Fala com a gente no{" "}
            <a href="https://wa.me/5511993796258" className="font-semibold text-tealDeep underline-offset-2 hover:underline">
              WhatsApp
            </a>{" "}
            ou veja também os nossos{" "}
            <Link href="/termos" className="font-semibold text-tealDeep underline-offset-2 hover:underline">
              Termos de Uso
            </Link>
            .
          </p>
        }
      />
      <SiteFooter />
    </main>
  );
}

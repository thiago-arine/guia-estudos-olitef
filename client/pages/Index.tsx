import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { cn } from "../lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const sections = [
  { id: "inicio", label: "Início", icon: "🏠" },
  { id: "fundamentos", label: "Fundamentos", icon: "🧠" },
  { id: "renda-fixa", label: "Renda Fixa", icon: "🔒" },
  { id: "renda-variavel", label: "Renda Variável", icon: "📈" },
  { id: "calculadora", label: "Calculadora de Juros", icon: "➗" },
  { id: "flashcards", label: "Flash Cards", icon: "🎯" },
  { id: "questionario", label: "Questionário", icon: "📝" },
  { id: "provas-anteriores", label: "Conteúdos Complementares", icon: "📄" },
];

const flashCardData = [
  {
    category: "Juros",
    cards: [
      {
        front: "Qual a fórmula dos Juros Simples e o que cada letra significa?",
        back: (
          <>
            <code className="font-mono">J = C × i × t.&nbsp;</code>J = Juros, C
            = Capital, i = Taxa de Juros, t = Tempo.
          </>
        ),
      },
      {
        front:
          "Qual a fórmula dos Juros Compostos e o que cada letra significa?",
        back: "M=C⋅(1+i)ⁿ. M = Montante, C = Capital, i = Taxa de Juros, n = Tempo.",
      },
      {
        front: "Por que os juros compostos são mais vantajosos que os simples?",
        back: "Porque os juros compostos rendem sobre o valor acumulado (juros sobre juros), gerando crescimento exponencial, enquanto os simples rendem apenas sobre o capital inicial.",
      },
      {
        front: 'O que significa "Amortização" em uma dívida?',
        back: "Aplicar pagamentos extras ao principal da dívida para reduzir juros e o tempo de pagamento.",
      },
    ],
  },
  {
    category: "Renda Fixa",
    cards: [
      {
        front: "O que significa um investimento de Renda Fixa prefixada?",
        back: "O retorno do investimento é conhecido exatamente no dia do vencimento.",
      },
      {
        front: "O que significa um investimento de Renda Fixa pós-fixada?",
        back: "O retorno só é conhecido no dia do vencimento, pois acompanha um índice de referência.",
      },
      {
        front: "Qual o principal objetivo do IPCA?",
        back: "Medir a inflação oficial do país.",
      },
      {
        front: "Qual a função da Taxa Selic?",
        back: "É a taxa básica de juros da economia brasileira, que influencia o custo dos juros e o ganho dos investimentos.",
      },
      {
        front: "Quem decide a Taxa Selic Meta e com que frequência?",
        back: "O Comitê de Política Monetária (COPOM), 8 vezes por ano (a cada 45 dias).",
      },
      {
        front:
          "Por que os Títulos Públicos (Tesouro Direto) são considerados os investimentos mais seguros do Brasil?",
        back: "Porque são emitidos pelo governo brasileiro e têm o menor risco de crédito do país.",
      },
      {
        front:
          "Qual Título Público é ideal para reserva de emergência e por quê?",
        back: "Tesouro Selic, pois rende diariamente conforme a Selic e tem alta liquidez para resgate.",
      },
      {
        front: "Qual a diferença entre Tesouro Prefixado e Tesouro IPCA+?",
        back: "Tesouro Prefixado tem retorno conhecido antecipadamente. Tesouro IPCA+ tem parte da remuneração atrelada à inflação (IPCA) e parte prefixada.",
      },
      {
        front: "O que é um CDB?",
        back: "Um título emitido por bancos, onde o investidor empresta dinheiro ao banco em troca de juros.",
      },
      {
        front:
          "Qual a principal diferença entre LCI/LCA e CDB para pessoa física?",
        back: "LCI e LCA são isentas de Imposto de Renda para pessoa física, enquanto CDB não.",
      },
      {
        front:
          "O que é uma Debênture e qual seu principal risco em relação ao CDB?",
        back: "É um título de dívida emitido por empresas. Principal risco: não é coberta pelo FGC.",
      },
      {
        front:
          "Quais as duas regras de rentabilidade da Poupança em relação à Taxa Selic Meta?",
        back: "Se Selic Meta > 8,5% a.a., rende 0,5% a.m. + TR. Se Selic Meta ≤ 8,5% a.a., rende 70% da Selic Meta + TR.",
      },
      {
        front: "O que é o CDI e como se relaciona com a Taxa Selic?",
        back: "Certificado de Depósito Interbancário. Taxa de referência para empréstimos entre bancos, geralmente próxima à Taxa Selic.",
      },
      {
        front: "O que é TR (Taxa Referencial)?",
        back: "Uma taxa de referência utilizada para reajustes de poupança e alguns financiamentos.",
      },
    ],
  },
  {
    category: "Renda Variável",
    cards: [
      {
        front: "O que são ações?",
        back: "Títulos que representam uma parte do capital social de uma empresa, tornando o investidor sócio.",
      },
      {
        front:
          "Qual a diferença entre Ações Ordinárias (ON) e Preferenciais (PN)?",
        back: "ON dão direito a voto. PN dão prioridade no recebimento de dividendos e reembolso de capital, mas geralmente sem voto.",
      },
      {
        front: "O que é um IPO?",
        back: "A Oferta Pública Inicial, o primeiro lançamento de ações de uma empresa no mercado.",
      },
      {
        front: "O que é um Follow on?",
        back: "Uma nova emissão de ações de uma empresa que já tem capital aberto, após o IPO.",
      },
      {
        front: "Diferencie Oferta Primária de Oferta Secundária de ações.",
        back: "Primária: recursos entram na empresa. Secundária: apenas troca de propriedade entre investidores, sem mudar o capital da empresa.",
      },
      {
        front: "O que o Ibovespa B3 mede?",
        back: "O desempenho médio das ações das maiores e mais negociadas empresas na B3.",
      },
      {
        front:
          "O que são FIIs e quais seus dois principais tipos de investimento?",
        back: 'Fundos de Investimento Imobiliário. Investem em "tijolos" (imóveis físicos) ou em "papel" (títulos imobiliários).',
      },
      {
        front: "O que são ETFs?",
        back: "Fundos de investimento que replicam um índice e são negociados na bolsa como se fossem ações.",
      },
      {
        front: "Qual a vantagem de investir em BDRs?",
        back: "Permitem investir em ações de empresas estrangeiras comprando-as na B3, sem precisar abrir conta no exterior.",
      },
      {
        front: "O que são Fiagros?",
        back: "Fundos de Investimento nas Cadeias Produtivas Agroindustriais - fundos que aplicam em ativos do setor agroindustrial.",
      },
      {
        front: "O que é o IFIX?",
        back: "Índice que mede a média dos preços dos maiores fundos imobiliários (FIIs) negociados na Bolsa.",
      },
    ],
  },
  {
    category: "Macroeconomia",
    cards: [
      {
        front: "O que acontece com a Taxa Selic quando a inflação está alta?",
        back: "O COPOM tende a aumentar a Selic para desestimular consumo e investimentos, combatendo a inflaç��o.",
      },
      {
        front: "Qual o impacto de uma inflação alta no poder de compra?",
        back: "O dinheiro vale menos, pois se compra menos com a mesma quantia.",
      },
      {
        front: "O que o PIB mede?",
        back: "O valor total de todos os bens e serviços finais produzidos dentro de um país em um ano.",
      },
      {
        front: "O que é IGP-M?",
        back: "Índice Geral de Preços – Mercado. Índice de inflação calculado pela FGV, frequentemente usado para reajustes de aluguéis.",
      },
      {
        front: "Como um PIB em crescimento afeta o mercado de ações?",
        back: "PIB em crescimento indica economia aquecida, o que geralmente é positivo para as empresas e para o mercado de ações.",
      },
    ],
  },
  {
    category: "Riscos e Garantias",
    cards: [
      {
        front: "O que é Risco de Crédito em investimentos?",
        back: "Chance de não conseguir reaver o dinheiro investido (calote do emissor).",
      },
      {
        front: "O que é Risco de Liquidez?",
        back: "Dificuldade ou tempo necessário para converter o investimento em dinheiro disponível sem perdas.",
      },
      {
        front: "O que é Risco de Mercado?",
        back: "Oscilação do preço do título no mercado secundário devido a mudanças nas taxas de juros ou condições econômicas.",
      },
      {
        front:
          "Qual o limite de cobertura do FGC por CPF e por instituição financeira?",
        back: "R$ 250.000,00 por CPF e por instituição financeira.",
      },
      {
        front: "O que é o FGCOOP?",
        back: "Fundo Garantidor do Cooperativismo de Crédito. Oferece garantia similar ao FGC para investimentos em cooperativas de crédito.",
      },
      {
        front: "Quais investimentos são cobertos pelo FGC?",
        back: "CDB, LCI, LCA, poupança, RDB e depósitos em conta corrente, até R$ 250.000 por CPF/instituição.",
      },
      {
        front: "Por que as Debêntures têm maior risco que CDBs?",
        back: "Porque não possuem a garantia do FGC. Em caso de falência da empresa emissora, o investidor pode perder todo o capital.",
      },
    ],
  },
  {
    category: "Títulos Específicos",
    cards: [
      {
        front: "Para que serve o Tesouro Educa+?",
        back: "Garante retorno acima da inflação (IPCA + juros prefixados) e distribui renda mensal por 5 anos após uma data escolhida, para auxiliar no planejamento de estudos.",
      },
      {
        front: "Para que serve o Tesouro RendA+?",
        back: "Similar ao Educa+, ideal para planejar a aposentadoria. Distribui renda mensal por 20 anos, contribuindo como uma renda extra na aposentadoria.",
      },
      {
        front: "Quando é vantajoso investir no Tesouro Prefixado?",
        back: 'Quando há expectativa de queda da Taxa Selic, pois você "trava" uma rentabilidade maior do que a Selic que possivelmente cairá.',
      },
      {
        front: "Por que o Tesouro IPCA+ é ideal para objetivos de longo prazo?",
        back: "Porque protege contra a inflação, garantindo que o poder de compra seja mantido ao longo do tempo.",
      },
      {
        front: "O que é LCI e qual sua principal vantagem?",
        back: "Letra de Crédito Imobiliário. Principal vantagem: isenção de Imposto de Renda para pessoa física.",
      },
      {
        front: "O que é LCA e qual sua principal vantagem?",
        back: "Letra de Crédito do Agronegócio. Principal vantagem: isenção de Imposto de Renda para pessoa física.",
      },
    ],
  },
];

const quizData = [
  {
    difficulty: "Fácil",
    questions: [
      {
        question:
          "Qual é o nome da bolsa de valores oficial do Brasil, com sede em São Paulo?",
        answer: "B3 (Brasil, Bolsa, Balcão).",
      },
      {
        question: "Qual é a fórmula dos Juros Simples?",
        answer: <code className="font-mono">J = C × i × t</code>,
      },
      {
        question:
          'No Juros Composto, o que representa a letra "M" na fórmula M=C⋅(1+i)ⁿ?',
        answer: "Montante.",
      },
      {
        question:
          "Em um investimento de Renda Fixa, se a remuneração é prefixada, você sabe o retorno em qual momento?",
        answer: "No dia da contratação (início).",
      },
      {
        question:
          "Qual índice é considerado o principal indicador da inflação oficial do Brasil?",
        answer: "IPCA (Índice Nacional de Preços ao Consumidor Amplo).",
      },
      {
        question: "Qual o nome da taxa básica de juros da economia brasileira?",
        answer: "Taxa Selic.",
      },
      {
        question:
          "Qual risco em investimentos de Renda Fixa se refere à chance de o emissor não devolver o dinheiro investido?",
        answer: "Risco de Crédito.",
      },
      {
        question:
          "Qual fundo garante depósitos em conta e investimentos bancários em até R$ 250.000,00 por CPF?",
        answer: "FGC (Fundo Garantidor de Crédito).",
      },
      {
        question:
          "Qual a regra de rentabilidade da Poupança quando a Taxa Selic Meta está acima de 8,5% ao ano?",
        answer: "0,5% ao mês + Taxa Referencial (TR).",
      },
      {
        question:
          "Os Títulos Públicos são considerados os investimentos mais seguros do Brasil por serem emitidos por quem?",
        answer: "Pelo governo brasileiro (Tesouro Nacional).",
      },
      {
        question:
          "Qual tipo de Título Público é ideal para a reserva de emergência por render diariamente conforme a Taxa Selic?",
        answer: "Tesouro Selic.",
      },
      {
        question: "O que são ações?",
        answer:
          "Títulos que representam uma parte do capital social de uma sociedade anônima (empresa).",
      },
      {
        question:
          "Qual o nome da primeira emissão de ações de uma empresa no mercado, para o público em geral?",
        answer: "IPO (Oferta Pública Inicial).",
      },
      {
        question: "O que o Ibovespa B3 mede?",
        answer:
          "O desempenho médio das ações das maiores e mais negociadas empresas da B3.",
      },
      {
        question: 'O que significa "Amortização" em uma dívida?',
        answer:
          "Aplicar pagamentos extras ao principal da dívida, diminuindo parcelas e juros.",
      },
    ],
  },
  {
    difficulty: "Médio",
    questions: [
      {
        question:
          "Explique a principal diferença entre Juros Simples e Juros Compostos.",
        answer:
          "Juros Simples incidem apenas sobre o capital inicial, resultando em crescimento linear. Juros Compostos incidem sobre o capital inicial acrescido dos juros já acumulados, resultando em crescimento exponencial (juros sobre juros).",
      },
      {
        question:
          "Se um investimento de Renda Fixa tem remuneração pós-fixada atrelada ao IPCA, o que isso significa para o investidor?",
        answer:
          "Significa que o ganho exato só será conhecido no vencimento, pois ele irá variar conforme a inflação (IPCA) ao longo do período do investimento.",
      },
      {
        question:
          "Além do risco de crédito e liquidez, qual outro risco importante deve ser considerado em investimentos? Explique.",
        answer:
          "Risco de Mercado. Ele se refere à oscilação do preço do título no mercado secundário devido a mudanças nas taxas de juros ou condições econômicas.",
      },
      {
        question:
          "Qual a principal diferença de rentabilidade da Poupança em relação a títulos pós-fixados atuais?",
        answer:
          "A Poupança só rende a cada 30 dias, enquanto os títulos pós-fixados atuais geralmente rendem diariamente.",
      },
      {
        question:
          "Qual a principal vantagem do Tesouro IPCA+ e para quais objetivos ele é mais indicado?",
        answer:
          "Sua principal vantagem é a proteção contra a inflação, pois parte da remuneração é atrelada ao IPCA. É indicado para objetivos de longo prazo, como aposentadoria e educação, garantindo o poder de compra.",
      },
      {
        question:
          "Explique por que o COPOM aumenta a Taxa Selic quando a inflação está alta.",
        answer:
          "O COPOM aumenta a Selic para encarecer o crédito, desestimular o consumo e os investimentos. Com menos dinheiro circulando e menos demanda por bens e serviços, a tendência é que os preços se estabilizem ou diminuam, combatendo a inflação.",
      },
      {
        question:
          "Como o PIB de um país se relaciona com a arrecadação de impostos e investimentos públicos?",
        answer:
          "Se a economia (medida pelo PIB) cresce, a arrecadação de impostos tende a aumentar, o que possibilita mais investimentos em serviços públicos para a população.",
      },
      {
        question:
          "Qual a principal diferença de direito entre uma Ação Ordinária (ON) e uma Ação Preferencial (PN)?",
        answer:
          "A Ação Ordinária (ON) confere direito a voto nas assembleias da empresa, permitindo ao acionista influenciar decisões. A Ação Preferencial (PN) tem prioridade no recebimento de dividendos.",
      },
      {
        question:
          "Uma empresa que já fez seu IPO decide emitir mais a��ões para captar novos recursos. Como é chamada essa nova emiss��o e qual tipo de oferta (primária ou secundária) ela provavelmente será?",
        answer:
          'É chamada de "Follow on". Provavelmente será uma oferta primária, pois os recursos captados entrarão diretamente na empresa para financiar seus projetos e aumentar o capital.',
      },
      {
        question:
          'O que são ETFs e por que são comparados a "comprar um pacote de figurinhas"?',
        answer:
          'ETFs (Exchange Traded Funds) são fundos de investimento que replicam um índice de mercado e são negociados na bolsa como se fossem ações. São comparados a "comprar um pacote de figurinhas" porque, ao investir em um ETF, você adquire uma cesta diversificada de ativos (as "figurinhas" do índice) de uma só vez, sem precisar comprar cada ativo individualmente.',
      },
      {
        question:
          'Qual a diferença entre investir em FIIs de "tijolo" e de "papel"?',
        answer:
          'FIIs de "tijolo" investem em imóveis físicos (como shoppings, escritórios, galpões). FIIs de "papel" investem em títulos do mercado imobiliário (como CRIs, LCIs, cotas de outros fundos).',
      },
      {
        question:
          "Por que as LCI e LCA são consideradas mais atrativas que CDBs para pessoa física?",
        answer:
          "Porque LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são isentas de Imposto de Renda para pessoa física, enquanto CDBs têm tributação regressiva.",
      },
    ],
  },
  {
    difficulty: "Difícil",
    questions: [
      {
        question:
          "Em qual cenário econômico o Tesouro Prefixado pode ser mais vantajoso que o Tesouro Selic, e por quê?",
        answer:
          'O Tesouro Prefixado pode ser mais vantajoso em um cenário de expectativa de queda da Taxa Selic. Isso porque, ao prefixar a taxa de retorno, o investidor "trava" uma rentabilidade maior do que a Selic que possivelmente cairá no futuro. Se a Selic cair abaixo da taxa prefixada, o Prefixado terá um rendimento superior.',
      },
      {
        question:
          "Apesar de oferecerem potencial de maior rentabilidade, por que as Debêntures são consideradas investimentos de maior risco de crédito e menor liquidez comparadas a um CDB coberto pelo FGC?",
        answer:
          "As Debêntures têm maior risco de crédito porque não possuem a garantia do FGC. Em caso de falência da empresa emissora, o investidor pode perder todo o capital. A liquidez é menor porque são negociadas no mercado secundário e nem sempre há compradores imediatos, dificultando o resgate rápido do dinheiro sem perdas. CDBs cobertos pelo FGC têm risco de crédito mitigado e geralmente maior liquidez.",
      },
      {
        question:
          "Explique como a Taxa Selic atua como uma ferramenta do COPOM para controlar a inflação, detalhando o mecanismo por trás dessa relaç��o.",
        answer:
          "Quando a inflação está alta, o COPOM aumenta a Taxa Selic. Isso eleva o custo dos empréstimos e financiamentos para empresas e consumidores. Juros mais altos desestimulam o consumo (pois o crédito fica mais caro e os empréstimos existentes pesam mais) e os investimentos (tornando o financiamento de projetos mais custoso). Com menor demanda por bens e serviços na economia e menos dinheiro em circulação, a tendência natural é que os preços se estabilizem ou diminuam, contendo a inflação. O inverso ocorre para estimular a economia em momentos de baixa inflação.",
      },
      {
        question:
          "Um investidor deseja ter uma renda mensal futura garantida para complementar sua aposentadoria e também planeja os estudos de seu filho. Quais títulos públicos do Tesouro Direto seriam os mais adequados para cada um desses objetivos e por quê?",
        answer:
          "Para a aposentadoria: Tesouro RendA+. Ele é ideal para planejar a aposentadoria, pois garante uma rentabilidade acima da inflação (IPCA + juros prefixados) e distribui uma renda mensal por 20 anos, proporcionando um complemento financeiro. Para os estudos do filho: Tesouro Educa+. Semelhante ao RendA+, também garante retorno acima da inflação. Sua estrutura é pensada para planejamento educacional, distribuindo renda mensal por 5 anos (prazo estimado de um curso técnico ou superior) a partir de uma data escolhida.",
      },
      {
        question:
          "Analise um cenário onde um investidor possui R$ 100.000,00 e precisa decidir entre aplicar em Tesouro Selic (rendendo 100% do CDI) ou em um CDB que paga 115% do CDI, mas com carência de 2 anos. Quais fatores devem ser considerados nesta decisão?",
        answer:
          "Fatores a considerar: 1) Necessidade de liquidez - se o investidor pode precisar do dinheiro em menos de 2 anos, o Tesouro Selic é mais adequado; 2) Tributação - CDB tem IR regressivo, que diminui com o tempo, favorecendo aplicações mais longas; 3) Risco de crédito - Tesouro tem menor risco que o banco emissor do CDB; 4) Garantia FGC - CDB está coberto até R$ 250.000; 5) Expectativa da Selic - se houver expectativa de alta da Selic, o adicional de 15% do CDB pode compensar a carência; 6) Diversificação - considerar não concentrar todo o valor em um único investimento.",
      },
    ],
  },
];

interface InteractiveCardProps {
  title: string;
  description: string;
  details: { title: string; content: string }[];
}

interface FlashCardProps {
  front: string;
  back: string | React.ReactNode;
  isFlipped: boolean;
  onToggle: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
  front,
  back,
  isFlipped,
  onToggle,
}) => {
  return (
    <div
      className="relative w-full h-48 sm:h-56 md:h-64 cursor-pointer perspective-1000"
      onClick={onToggle}
    >
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180",
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <Card className="h-full flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-blue-600 font-semibold mb-2">
                PERGUNTA
              </div>
              <p className="text-sm sm:text-base text-gray-800 font-medium leading-snug">{front}</p>
              <div className="text-xs text-gray-500 mt-2 sm:mt-4">
                Clique para ver a resposta
              </div>
            </div>
          </Card>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <Card className="h-full flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-green-600 font-semibold mb-2">
                RESPOSTA
              </div>
              <div className="text-sm sm:text-base text-gray-800 font-medium leading-snug">{back}</div>
              <div className="text-xs text-gray-500 mt-2 sm:mt-4">
                Clique para voltar à pergunta
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  details,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="text-sm">
              <strong className="text-primary">{detail.title}:</strong>{" "}
              {detail.content}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

const SectionNav: React.FC<{
  activeSection: string;
  onSectionChange: (section: string) => void;
}> = ({ activeSection, onSectionChange }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/80 p-4 xl:p-6 fixed h-full hidden lg:block overflow-y-auto">
        <h1 className="text-xl xl:text-2xl font-bold text-primary mb-6 xl:mb-8">
          Guia OLITEF - Nível 3 (2025)
        </h1>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "flex items-center py-2 px-3 xl:px-4 rounded-lg text-gray-700 w-full text-left transition-all duration-200 text-sm xl:text-base",
                    "hover:bg-primary hover:text-white",
                    activeSection === section.id &&
                      "bg-primary text-white translate-x-1",
                  )}
                >
                  <span className="text-base xl:text-lg">{section.icon}</span>
                  <span className="ml-2 xl:ml-3">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <header className="lg:hidden mb-4 md:mb-6 px-2">
        <h1 className="text-xl sm:text-2xl font-bold text-primary text-center mb-4">
          Guia OLITEF - Nível 3 (2025)
        </h1>
        <select
          value={activeSection}
          onChange={(e) => onSectionChange(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white text-base shadow-sm"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.icon} {section.label}
            </option>
          ))}
        </select>
      </header>
    </>
  );
};

const CompoundInterestCalculator: React.FC = () => {
  const [capital, setCapital] = useState<number>(1000);
  const [rate, setRate] = useState<number>(1);
  const [time, setTime] = useState<number>(12);
  const [results, setResults] = useState<{
    simple: number;
    compound: number;
  } | null>(null);

  const calculate = () => {
    if (capital <= 0 || rate <= 0 || time <= 0) {
      alert("Por favor, insira valores válidos e maiores que zero.");
      return;
    }

    const rateDecimal = rate / 100;
    const simpleInterest = capital * rateDecimal * time;
    const simpleAmount = capital + simpleInterest;
    const compoundAmount = capital * Math.pow(1 + rateDecimal, time);

    setResults({ simple: simpleAmount, compound: compoundAmount });
  };

  const chartData = results
    ? {
        labels: ["Capital Inicial", "Montante Simples", "Montante Composto"],
        datasets: [
          {
            label: "Valor em R$",
            data: [capital, results.simple, results.compound],
            backgroundColor: [
              "rgba(156, 163, 175, 0.6)",
              "rgba(59, 130, 246, 0.6)",
              "rgba(29, 78, 216, 0.6)",
            ],
            borderColor: [
              "rgba(156, 163, 175, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(29, 78, 216, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(context.parsed.y);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "R$ " + value.toLocaleString("pt-BR");
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <div className="grid lg:grid-cols-2 gap-6 items-end">
        <div className="space-y-4">
          <div>
            <Label htmlFor="capital" className="text-sm sm:text-base">Capital Inicial (R$)</Label>
            <Input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              placeholder="1000"
              className="text-base"
            />
          </div>
          <div>
            <Label htmlFor="rate" className="text-sm sm:text-base">Taxa de Juros (% ao Mês)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="1"
              className="text-base"
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm sm:text-base">Tempo (Meses)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder="12"
              className="text-base"
            />
          </div>
          <Button onClick={calculate} className="w-full font-semibold text-base py-3">
            Calcular
          </Button>
        </div>

        <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center">
          <h4 className="font-bold text-base sm:text-lg text-blue-800 mb-2">Resultados</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Montante Juros Simples</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 break-words">
                {results
                  ? `R$ ${results.simple.toFixed(2).replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Montante Juros Compostos</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 break-words">
                {results
                  ? `R$ ${results.compound.toFixed(2).replace(".", ",")}`
                  : "R$ 0,00"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {chartData && (
        <div className="mt-6 sm:mt-8">
          <div className="relative w-full max-w-2xl mx-auto h-64 sm:h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </Card>
  );
};

const FlashCardSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCategory = flashCardData[selectedCategory];
  const currentCard = currentCategory.cards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < currentCategory.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); // Reset to front when advancing
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false); // Reset to front when going back
    }
  };

  const changeCategory = (categoryIndex: number) => {
    setSelectedCategory(categoryIndex);
    setCurrentCardIndex(0);
    setIsFlipped(false); // Reset to front when changing category
  };

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {flashCardData.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === index ? "default" : "outline"}
            onClick={() => changeCategory(index)}
            className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            {category.category}
          </Button>
        ))}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <span className="truncate pr-2">{currentCategory.category}</span>
          <span className="whitespace-nowrap">
            {currentCardIndex + 1} de {currentCategory.cards.length}
          </span>
        </div>
        <Progress
          value={((currentCardIndex + 1) / currentCategory.cards.length) * 100}
        />
      </div>

      {/* Flash Card */}
      <div className="max-w-2xl mx-auto px-2">
        <FlashCard
          front={currentCard.front}
          back={currentCard.back}
          isFlipped={isFlipped}
          onToggle={toggleCard}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-2 sm:gap-4 px-2">
        <Button
          variant="outline"
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className="text-sm px-3 sm:px-4"
        >
          ← Anterior
        </Button>
        <Button
          variant="outline"
          onClick={nextCard}
          disabled={currentCardIndex === currentCategory.cards.length - 1}
          className="text-sm px-3 sm:px-4"
        >
          Próximo →
        </Button>
      </div>
    </div>
  );
};

const QuizSection: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const currentQuiz = quizData[selectedDifficulty];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const changeDifficulty = (difficultyIndex: number) => {
    setSelectedDifficulty(difficultyIndex);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswers([]);
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  return (
    <div className="space-y-6">
      {/* Difficulty Selection */}
      <div className="flex flex-wrap gap-2">
        {quizData.map((quiz, index) => (
          <Button
            key={index}
            variant={selectedDifficulty === index ? "default" : "outline"}
            onClick={() => changeDifficulty(index)}
          >
            {quiz.difficulty}
          </Button>
        ))}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Nível: {currentQuiz.difficulty}</span>
          <span>
            {currentQuestionIndex + 1} de {currentQuiz.questions.length}
          </span>
        </div>
        <Progress
          value={
            ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100
          }
        />
      </div>

      {/* Question Card */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">
            Pergunta {currentQuestionIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium text-gray-800">
            {currentQuestion.question}
          </p>

          <div className="space-y-4">
            <textarea
              className="w-full min-h-[120px] p-3 border rounded-lg resize-none"
              placeholder="Digite sua resposta aqui..."
              value={userAnswers[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => setShowAnswer(!showAnswer)}
                variant="outline"
              >
                {showAnswer ? "Ocultar" : "Ver"} Resposta
              </Button>
            </div>

            {showAnswer && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Resposta Esperada:
                  </h4>
                  <div className="text-green-700">{currentQuestion.answer}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          ← Anterior
        </Button>
        <Button
          variant="outline"
          onClick={nextQuestion}
          disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
        >
          Próxima →
        </Button>
      </div>
    </div>
  );
};

const SelicExplanation: React.FC = () => {
  const [explanation, setExplanation] = useState<string>(
    "Clique em um botão para ver a explicação.",
  );
  const [activeButton, setActiveButton] = useState<string>("");

  const showAumentaExplanation = () => {
    setExplanation(
      "**Objetivo:** Combater a inflação alta. **Como:** Juros mais altos encarecem o crédito, desestimulando o consumo e os investimentos. Com menos dinheiro circulando e menos demanda, a tendência é que os preços se estabilizem ou diminuam.",
    );
    setActiveButton("aumenta");
  };

  const showDiminuiExplanation = () => {
    setExplanation(
      "**Objetivo:** Estimular a economia. **Como:** Juros mais baixos barateiam o crédito, incentivando o consumo e os investimentos. Com mais dinheiro circulando e mais demanda, a economia tende a se aquecer.",
    );
    setActiveButton("diminui");
  };

  return (
    <Card className="mt-6 p-6">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          A Relação entre Taxa Selic e Inflação
        </CardTitle>
        <CardDescription>
          A Taxa Selic é a principal ferramenta do Banco Central para controlar
          a inflação (o aumento geral dos preços). Entenda como uma afeta a
          outra clicando nos botões abaixo:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={showAumentaExplanation}
            variant={activeButton === "aumenta" ? "default" : "secondary"}
          >
            COPOM Aumenta a Selic ⬆️
          </Button>
          <Button
            onClick={showDiminuiExplanation}
            variant={activeButton === "diminui" ? "default" : "secondary"}
          >
            COPOM Diminui a Selic ⬇️
          </Button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
          <p
            dangerouslySetInnerHTML={{
              __html: explanation.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>",
              ),
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("inicio");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      let current = sections[0].id;
      sectionElements.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-warm-beige">
      <SectionNav
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />

      <main className="flex-1 lg:ml-64 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Início Section */}
        <section id="inicio" className="mb-12 md:mb-16">
          <Card className="p-4 sm:p-6 lg:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Bem-vindo ao Guia para a OLITEF 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Este guia foi criado para transformar o complexo mundo dos
                investimentos em um material de estudo acessível e interativo.
                Aqui, você encontrará os conceitos essenciais para começar sua
                jornada financeira, desde os fundamentos da economia até os
                detalhes dos principais produtos de Renda Fixa e Variável
                disponíveis no mercado brasileiro. Use a navegação para explorar
                os tópicos e a calculadora para aplicar seu conhecimento. Bons
                estudos!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fundamentos Section */}
        <section id="fundamentos" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Fundamentos Econômicos
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Entender estes conceitos é o primeiro passo para tomar decisões de
            investimento mais inteligentes. Eles formam a base sobre a qual o
            mercado financeiro opera e influenciam diretamente a rentabilidade
            de seus ativos.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary">
                  Juros Simples vs. Compostos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  A base de qualquer rendimento. Juros simples rendem sobre o
                  valor inicial, enquanto juros compostos rendem sobre o valor
                  acumulado (juros sobre juros), gerando um crescimento
                  exponencial.
                </p>
                <div className="text-xs sm:text-sm bg-blue-50 p-3 rounded-lg space-y-1">
                  <p>
                    <strong>Simples:</strong>{" "}
                    <code className="font-mono break-words">J = C × i × t</code>
                  </p>
                  <p>
                    <strong>Compostos:</strong>{" "}
                    <code className="font-mono break-words">M = C × (1 + i)ⁿ</code>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary">
                  PIB (Produto Interno Bruto)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">
                  Mede a soma de todos os bens e serviços produzidos no país. Um
                  PIB em crescimento indica uma economia aquecida, o que
                  geralmente é positivo para as empresas e, consequentemente,
                  para o mercado de ações.
                </p>
              </CardContent>
            </Card>
          </div>

          <SelicExplanation />
        </section>

        {/* Renda Fixa Section */}
        <section id="renda-fixa" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Renda Fixa</h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Nesta modalidade, você "empresta" seu dinheiro para uma instituição
            (governo, banco ou empresa) e recebe uma remuneração com regras
            definidas no momento da aplicação. É considerada a porta de entrada
            para o mundo dos investimentos por sua previsibilidade e segurança.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <InteractiveCard
              title="Títulos Públicos"
              description="Emitidos pelo governo federal. São os investimentos mais seguros do país."
              details={[
                {
                  title: "Tesouro Selic",
                  content: "Pós-fixado, ideal para reserva de emergência.",
                },
                {
                  title: "Tesouro Prefixado",
                  content: "Rentabilidade definida na compra.",
                },
                {
                  title: "Tesouro IPCA+",
                  content: "Rende paralelamente a inflação.",
                },
                {
                  title: "RendA+ e Educa+",
                  content:
                    "Focados em aposentadoria e educação, respectivamente, com pagamentos mensais no futuro.",
                },
              ]}
            />

            <InteractiveCard
              title="CDB, LCI e LCA"
              description="Títulos emitidos por bancos para captar recursos. Contam com a proteção do FGC."
              details={[
                {
                  title: "CDB",
                  content: "Certificado de Depósito Bancário. O mais comum.",
                },
                {
                  title: "LCI/LCA",
                  content:
                    "Letras de Crédito Imobiliário e do Agronegócio. São isentas de Imposto de Renda para pessoa física.",
                },
                {
                  title: "Garantia",
                  content: "Cobertura do FGC de até R$ 250 mil por CPF.",
                },
              ]}
            />

            <InteractiveCard
              title="Debêntures"
              description="Você empresta dinheiro para empresas (não financeiras). Oferecem maior retorno, mas com maior risco."
              details={[
                {
                  title: "Risco",
                  content:
                    "Não possuem a garantia do FGC. O risco de crédito é o da empresa emissora.",
                },
                {
                  title: "Rentabilidade",
                  content:
                    "Geralmente maior que a de outros títulos de renda fixa para compensar o risco adicional.",
                },
              ]}
            />
          </div>
        </section>

        {/* Renda Variável Section */}
        <section id="renda-variavel" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Renda Variável
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Aqui, a rentabilidade não é conhecida no momento da aplicação. O
            valor dos ativos oscila conforme o mercado, oferecendo maior
            potencial de ganho, mas também maior risco. É onde você se torna
            sócio de empresas e projetos.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <InteractiveCard
              title="Aç��es"
              description="Pequenas partes de uma empresa. Ao comprar, você se torna sócio."
              details={[
                {
                  title: "Ordinárias (ON)",
                  content: "Dão direito a voto nas assembleias.",
                },
                {
                  title: "Preferenciais (PN)",
                  content: "Dão preferência no recebimento de dividendos.",
                },
                {
                  title: "IPO",
                  content:
                    "A primeira vez que uma empresa vende ações na bolsa.",
                },
              ]}
            />

            <InteractiveCard
              title="Fundos Imobiliários (FIIs)"
              description="Investem em empreendimentos imobili��rios, como shoppings e escritórios."
              details={[
                {
                  title: "Tipos",
                  content:
                    'Fundos de "tijolo" (imóveis físicos) e de "papel" (títulos de crédito imobiliário).',
                },
                {
                  title: "Vantagem",
                  content:
                    "Recebimento de aluguéis mensais, isentos de IR para pessoa física.",
                },
              ]}
            />

            <InteractiveCard
              title="ETFs e BDRs"
              description="Formas de diversificar seus investimentos de forma simples."
              details={[
                {
                  title: "ETFs",
                  content:
                    "Fundos que replicam um índice da bolsa (ex: Ibovespa). É como comprar uma cesta de ações de uma vez.",
                },
                {
                  title: "BDRs",
                  content:
                    "Permitem investir em empresas estrangeiras (como Apple, Google) diretamente pela bolsa brasileira.",
                },
              ]}
            />
          </div>
        </section>

        {/* Calculadora Section */}
        <section id="calculadora" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Calculadora de Juros
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Veja na prática a diferen��a entre juros simples e compostos.
            Preencha os campos abaixo e visualize o poder da capitalização ao
            longo do tempo.
          </p>

          <CompoundInterestCalculator />
        </section>

        {/* Flash Cards Section */}
        <section id="flashcards" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Flash Cards para Estudo
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Teste seus conhecimentos com nossos flash cards interativos. Clique
            nos cards para revelar as respostas e navegue entre diferentes
            categorias para revisar os conceitos mais importantes.
          </p>

          <FlashCardSection />
        </section>

        {/* Questionário Section */}
        <section id="questionario" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Questionário Interativo
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Pratique com perguntas de diferentes níveis de dificuldade. Escreva
            suas respostas e compare com as respostas esperadas para consolidar
            seu aprendizado.
          </p>

          <QuizSection />
        </section>

        {/* Provas Anteriores Section */}
        <section id="provas-anteriores" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Acesso a Provas Anteriores e Recursos
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 lg:mb-8">
            Estude com materiais e provas de edições passadas da OLITEF. Utilize
            estes recursos para praticar e se familiarizar com o formato das
            questões.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary flex items-center gap-2">
                  📚 Prova 2024
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Prova e Gabarito do Nível 3 (1º Ano do Ensino Médio) - OLITEF
                  2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Acesse a prova completa com gabarito da edi��ão anterior para
                  praticar e conhecer o estilo das questões.
                </p>
                <Button
                  className="w-full text-sm sm:text-base"
                  onClick={() =>
                    window.open(
                      "https://upmat-gestao.s3.us-west-2.amazonaws.com/Olitef/2024/Provas+e+Gabaritos/Prova+e+Gabarito+N%C3%ADvel+3+(1%C2%BA+Ano+do+Ensino+M%C3%A9dio)+-+OLITEF+2024.pdf",
                      "_blank",
                    )
                  }
                >
                  Baixar Prova 2024
                </Button>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary flex items-center gap-2">
                  🎓 Curso B3
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Comece por aqui para investir - Curso oficial da B3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Curso gratuito e oficial da B3 que ensina os fundamentos dos
                  investimentos no mercado brasileiro.
                </p>
                <Button
                  className="w-full text-sm sm:text-base"
                  onClick={() =>
                    window.open(
                      "https://edu.b3.com.br/w/comece-por-aqui-para-investir-curso",
                      "_blank",
                    )
                  }
                >
                  Acessar Curso B3
                </Button>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary flex items-center gap-2">
                  ��� Material Extra
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Conteúdos OLITEF - Material de Estudo Complementar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Material complementar com conceitos fundamentais de
                  investimentos e economia, focado nos produtos do mercado
                  financeiro brasileiro.
                </p>
                <Button
                  className="w-full text-sm sm:text-base"
                  onClick={() =>
                    window.open(
                      "https://cdn.builder.io/o/assets%2F776fb6a9bcd04c3cad60f1ae1f8d4051%2F3a1f9407858f413fafaff82c3d5dd9f2?alt=media&token=cdedbe3a-2666-4a71-9282-15a426ae8b86&apiKey=776fb6a9bcd04c3cad60f1ae1f8d4051",
                      "_blank",
                    )
                  }
                >
                  Baixar Material Extra
                </Button>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-primary flex items-center gap-2">
                  📝 Inscrição OLITEF 2025
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Formulário oficial de inscrição para a OLITEF 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Faça sua inscrição para a Olimpíada de Educação Financeira
                  2025. Não perca o prazo!
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open("https://forms.gle/uSfRyobTWoQSdPEA6", "_blank")
                  }
                >
                  Inscrever-se Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 p-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                💡 Dica de Estudo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Recomendamos começar com o <strong>Curso B3</strong> para uma
                base sólida, depois estudar o <strong>Material Extra</strong>{" "}
                para aprofundar os conceitos, e finalizar praticando com a{" "}
                <strong>Prova 2024</strong> para se familiarizar com o formato e
                nível das questões.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { cn } from '../lib/utils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const sections = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'fundamentos', label: 'Fundamentos', icon: '🧠' },
  { id: 'renda-fixa', label: 'Renda Fixa', icon: '🔒' },
  { id: 'renda-variavel', label: 'Renda Variável', icon: '📈' },
  { id: 'calculadora', label: 'Calculadora de Juros', icon: '➗' },
  { id: 'flashcards', label: 'Flash Cards', icon: '🎯' },
  { id: 'questionario', label: 'Questionário', icon: '📝' },
];

const flashCardData = [
  {
    category: "Juros",
    cards: [
      {
        front: "Qual a fórmula dos Juros Simples e o que cada letra significa?",
        back: "J=C⋅i⋅t. J = Juros, C = Capital, i = Taxa de Juros, t = Tempo."
      },
      {
        front: "Qual a fórmula dos Juros Compostos e o que cada letra significa?",
        back: "M=C⋅(1+i)ⁿ. M = Montante, C = Capital, i = Taxa de Juros, n = Tempo."
      }
    ]
  },
  {
    category: "Renda Fixa",
    cards: [
      {
        front: "O que significa um investimento de Renda Fixa prefixada?",
        back: "O retorno do investimento é conhecido exatamente no dia do vencimento."
      },
      {
        front: "O que significa um investimento de Renda Fixa pós-fixada?",
        back: "O retorno só é conhecido no dia do vencimento, pois acompanha um índice de referência."
      },
      {
        front: "Qual o principal objetivo do IPCA?",
        back: "Medir a inflação oficial do país."
      },
      {
        front: "Qual a função da Taxa Selic?",
        back: "É a taxa básica de juros da economia brasileira, que influencia o custo dos juros e o ganho dos investimentos."
      },
      {
        front: "Quem decide a Taxa Selic Meta e com que frequência?",
        back: "O Comitê de Política Monetária (COPOM), 8 vezes por ano (a cada 45 dias)."
      },
      {
        front: "Qual o limite de cobertura do FGC por CPF e por instituição financeira?",
        back: "R$ 250.000,00 por CPF e por instituição financeira."
      },
      {
        front: "Por que os Títulos Públicos (Tesouro Direto) são considerados os investimentos mais seguros do Brasil?",
        back: "Porque são emitidos pelo governo brasileiro e têm o menor risco de crédito do país."
      },
      {
        front: "Qual Título Público é ideal para reserva de emergência e por quê?",
        back: "Tesouro Selic, pois rende diariamente conforme a Selic e tem alta liquidez para resgate."
      }
    ]
  },
  {
    category: "Renda Variável",
    cards: [
      {
        front: "O que são ações?",
        back: "Títulos que representam uma parte do capital social de uma empresa, tornando o investidor sócio."
      },
      {
        front: "Qual a diferença entre Ações Ordinárias (ON) e Preferenciais (PN)?",
        back: "ON dão direito a voto. PN dão prioridade no recebimento de dividendos e reembolso de capital, mas geralmente sem voto."
      },
      {
        front: "O que é um IPO?",
        back: "A Oferta Pública Inicial, o primeiro lançamento de ações de uma empresa no mercado."
      },
      {
        front: "O que são FIIs e quais seus dois principais tipos de investimento?",
        back: "Fundos de Investimento Imobiliário. Investem em \"tijolos\" (imóveis físicos) ou em \"papel\" (títulos imobiliários)."
      },
      {
        front: "O que são ETFs?",
        back: "Fundos de investimento que replicam um índice e são negociados na bolsa como se fossem ações."
      }
    ]
  },
  {
    category: "Macroeconomia",
    cards: [
      {
        front: "O que acontece com a Taxa Selic quando a inflação está alta?",
        back: "O COPOM tende a aumentar a Selic para desestimular consumo e investimentos, combatendo a inflação."
      },
      {
        front: "Qual o impacto de uma inflação alta no poder de compra?",
        back: "O dinheiro vale menos, pois se compra menos com a mesma quantia."
      },
      {
        front: "O que o PIB mede?",
        back: "O valor total de todos os bens e serviços finais produzidos dentro de um país em um ano."
      }
    ]
  }
];

const quizData = [
  {
    difficulty: "Fácil",
    questions: [
      {
        question: "Qual é o nome da bolsa de valores oficial do Brasil, com sede em São Paulo?",
        answer: "B3 (Brasil, Bolsa, Balcão)."
      },
      {
        question: "Qual é a fórmula dos Juros Simples?",
        answer: "J=C⋅i⋅t."
      },
      {
        question: "No Juros Composto, o que representa a letra \"M\" na fórmula M=C⋅(1+i)ⁿ?",
        answer: "Montante."
      },
      {
        question: "Em um investimento de Renda Fixa, se a remuneração é prefixada, você sabe o retorno em qual momento?",
        answer: "No dia da contratação (início)."
      },
      {
        question: "Qual índice é considerado o principal indicador da inflação oficial do Brasil?",
        answer: "IPCA (Índice Nacional de Preços ao Consumidor Amplo)."
      }
    ]
  },
  {
    difficulty: "Médio",
    questions: [
      {
        question: "Explique a principal diferença entre Juros Simples e Juros Compostos.",
        answer: "Juros Simples incidem apenas sobre o capital inicial, resultando em crescimento linear. Juros Compostos incidem sobre o capital inicial acrescido dos juros já acumulados, resultando em crescimento exponencial."
      },
      {
        question: "Se um investimento de Renda Fixa tem remuneração pós-fixada atrelada ao IPCA, o que isso significa para o investidor?",
        answer: "Significa que o ganho exato só será conhecido no vencimento, pois ele irá variar conforme a inflação (IPCA) ao longo do período do investimento."
      },
      {
        question: "Explique por que o COPOM aumenta a Taxa Selic quando a inflação está alta.",
        answer: "O COPOM aumenta a Selic para encarecer o crédito, desestimular o consumo e os investimentos. Com menos dinheiro circulando e menos demanda por bens e serviços, a tendência é que os preços se estabilizem ou diminuam, combatendo a inflação."
      }
    ]
  },
  {
    difficulty: "Difícil",
    questions: [
      {
        question: "Em qual cenário econômico o Tesouro Prefixado pode ser mais vantajoso que o Tesouro Selic, e por quê?",
        answer: "O Tesouro Prefixado pode ser mais vantajoso em um cenário de expectativa de queda da Taxa Selic. Isso porque, ao prefixar a taxa de retorno, o investidor \"trava\" uma rentabilidade maior do que a Selic que possivelmente cairá no futuro."
      },
      {
        question: "Explique como a Taxa Selic atua como uma ferramenta do COPOM para controlar a inflação, detalhando o mecanismo por trás dessa relação.",
        answer: "Quando a inflação está alta, o COPOM aumenta a Taxa Selic. Isso eleva o custo dos empréstimos e financiamentos para empresas e consumidores. Juros mais altos desestimulam o consumo e os investimentos. Com menor demanda por bens e serviços na economia e menos dinheiro em circulação, a tendência natural é que os preços se estabilizem ou diminuam, contendo a inflação."
      }
    ]
  }
];

interface InteractiveCardProps {
  title: string;
  description: string;
  details: { title: string; content: string }[];
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, description, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="text-sm">
              <strong className="text-primary">{detail.title}:</strong> {detail.content}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

const SectionNav: React.FC<{ activeSection: string; onSectionChange: (section: string) => void }> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/80 p-6 fixed h-full hidden lg:block">
        <h1 className="text-2xl font-bold text-primary mb-8">Guia do Investidor</h1>
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "flex items-center py-2 px-4 rounded-lg text-gray-700 w-full text-left transition-all duration-200",
                    "hover:bg-primary hover:text-white",
                    activeSection === section.id && "bg-primary text-white translate-x-1"
                  )}
                >
                  <span>{section.icon}</span>
                  <span className="ml-3">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <header className="lg:hidden mb-6">
        <h1 className="text-2xl font-bold text-primary">Guia do Investidor</h1>
        <select 
          value={activeSection}
          onChange={(e) => onSectionChange(e.target.value)}
          className="mt-4 w-full p-2 border rounded-lg bg-white"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
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
  const [results, setResults] = useState<{ simple: number; compound: number } | null>(null);

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

  const chartData = results ? {
    labels: ['Capital Inicial', 'Montante Simples', 'Montante Composto'],
    datasets: [{
      label: 'Valor em R$',
      data: [capital, results.simple, results.compound],
      backgroundColor: [
        'rgba(156, 163, 175, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(29, 78, 216, 0.6)'
      ],
      borderColor: [
        'rgba(156, 163, 175, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(29, 78, 216, 1)'
      ],
      borderWidth: 1
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            }).format(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return 'R$ ' + value.toLocaleString('pt-BR');
          }
        }
      }
    }
  };

  return (
    <Card className="p-8">
      <div className="grid md:grid-cols-2 gap-6 items-end">
        <div className="space-y-4">
          <div>
            <Label htmlFor="capital">Capital Inicial (R$)</Label>
            <Input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              placeholder="1000"
            />
          </div>
          <div>
            <Label htmlFor="rate">Taxa de Juros (% ao Mês)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="1"
            />
          </div>
          <div>
            <Label htmlFor="time">Tempo (Meses)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder="12"
            />
          </div>
          <Button onClick={calculate} className="w-full font-semibold">
            Calcular
          </Button>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h4 className="font-bold text-lg text-blue-800 mb-2">Resultados</h4>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Montante Juros Simples</p>
              <p className="text-2xl font-bold text-gray-800">
                {results ? `R$ ${results.simple.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Montante Juros Compostos</p>
              <p className="text-2xl font-bold text-blue-700">
                {results ? `R$ ${results.compound.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {chartData && (
        <div className="mt-8">
          <div className="relative w-full max-w-2xl mx-auto h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </Card>
  );
};

const SelicExplanation: React.FC = () => {
  const [explanation, setExplanation] = useState<string>("Clique em um botão para ver a explicação.");
  const [activeButton, setActiveButton] = useState<string>("");

  const showAumentaExplanation = () => {
    setExplanation("**Objetivo:** Combater a inflação alta. **Como:** Juros mais altos encarecem o crédito, desestimulando o consumo e os investimentos. Com menos dinheiro circulando e menos demanda, a tendência é que os preços se estabilizem ou diminuam.");
    setActiveButton("aumenta");
  };

  const showDiminuiExplanation = () => {
    setExplanation("**Objetivo:** Estimular a economia. **Como:** Juros mais baixos barateiam o crédito, incentivando o consumo e os investimentos. Com mais dinheiro circulando e mais demanda, a economia tende a se aquecer.");
    setActiveButton("diminui");
  };

  return (
    <Card className="mt-6 p-6">
      <CardHeader>
        <CardTitle className="text-xl text-primary">A Relação entre Taxa Selic e Inflação</CardTitle>
        <CardDescription>
          A Taxa Selic é a principal ferramenta do Banco Central para controlar a inflação (o aumento geral dos preços). 
          Entenda como uma afeta a outra clicando nos botões abaixo:
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
          <p dangerouslySetInnerHTML={{ __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-warm-beige">
      <SectionNav activeSection={activeSection} onSectionChange={scrollToSection} />
      
      <main className="flex-1 lg:ml-64 p-6 md:p-10">
        {/* Início Section */}
        <section id="inicio" className="mb-16">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">
                Bem-vindo ao Guia Interativo do Investidor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Este guia foi criado para transformar o complexo mundo dos investimentos em um material de estudo 
                acessível e interativo. Aqui, você encontrará os conceitos essenciais para começar sua jornada 
                financeira, desde os fundamentos da economia até os detalhes dos principais produtos de Renda Fixa 
                e Variável disponíveis no mercado brasileiro. Use a navegação para explorar os tópicos e a 
                calculadora para aplicar seu conhecimento. Bons estudos!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fundamentos Section */}
        <section id="fundamentos" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Fundamentos Econômicos</h2>
          <p className="text-gray-500 mb-8">
            Entender estes conceitos é o primeiro passo para tomar decisões de investimento mais inteligentes. 
            Eles formam a base sobre a qual o mercado financeiro opera e influenciam diretamente a rentabilidade de seus ativos.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Juros Simples vs. Compostos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  A base de qualquer rendimento. Juros simples rendem sobre o valor inicial, enquanto juros compostos 
                  rendem sobre o valor acumulado (juros sobre juros), gerando um crescimento exponencial.
                </p>
                <div className="text-sm bg-blue-50 p-3 rounded-lg space-y-1">
                  <p><strong>Simples:</strong> <code className="font-mono">J = C × i × t</code></p>
                  <p><strong>Compostos:</strong> <code className="font-mono">M = C × (1 + i)ⁿ</code></p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl text-primary">PIB (Produto Interno Bruto)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mede a soma de todos os bens e serviços produzidos no país. Um PIB em crescimento indica uma 
                  economia aquecida, o que geralmente é positivo para as empresas e, consequentemente, para o mercado de ações.
                </p>
              </CardContent>
            </Card>
          </div>

          <SelicExplanation />
        </section>

        {/* Renda Fixa Section */}
        <section id="renda-fixa" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Renda Fixa</h2>
          <p className="text-gray-500 mb-8">
            Nesta modalidade, você "empresta" seu dinheiro para uma instituição (governo, banco ou empresa) e recebe 
            uma remuneração com regras definidas no momento da aplicação. É considerada a porta de entrada para o 
            mundo dos investimentos por sua previsibilidade e segurança.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractiveCard
              title="Títulos Públicos"
              description="Emitidos pelo governo federal. São os investimentos mais seguros do país."
              details={[
                { title: "Tesouro Selic", content: "Pós-fixado, ideal para reserva de emergência." },
                { title: "Tesouro Prefixado", content: "Rentabilidade definida na compra." },
                { title: "Tesouro IPCA+", content: "Protege seu dinheiro da inflação." },
                { title: "RendA+ e Educa+", content: "Focados em aposentadoria e educação, com pagamentos mensais no futuro." }
              ]}
            />

            <InteractiveCard
              title="CDB, LCI e LCA"
              description="Títulos emitidos por bancos para captar recursos. Contam com a proteção do FGC."
              details={[
                { title: "CDB", content: "Certificado de Depósito Bancário. O mais comum." },
                { title: "LCI/LCA", content: "Letras de Crédito Imobiliário e do Agronegócio. São isentas de Imposto de Renda para pessoa física." },
                { title: "Garantia", content: "Cobertura do FGC de até R$ 250 mil por CPF/instituição." }
              ]}
            />

            <InteractiveCard
              title="Debêntures"
              description="Você empresta dinheiro para empresas (não financeiras). Oferecem maior retorno, mas com maior risco."
              details={[
                { title: "Risco", content: "Não possuem a garantia do FGC. O risco de crédito é o da empresa emissora." },
                { title: "Rentabilidade", content: "Geralmente maior que a de outros títulos de renda fixa para compensar o risco adicional." }
              ]}
            />
          </div>
        </section>

        {/* Renda Variável Section */}
        <section id="renda-variavel" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Renda Variável</h2>
          <p className="text-gray-500 mb-8">
            Aqui, a rentabilidade não é conhecida no momento da aplicação. O valor dos ativos oscila conforme o mercado, 
            oferecendo maior potencial de ganho, mas também maior risco. É onde você se torna sócio de empresas e projetos.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractiveCard
              title="Ações"
              description="Pequenas partes de uma empresa. Ao comprar, você se torna sócio."
              details={[
                { title: "Ordinárias (ON)", content: "Dão direito a voto nas assembleias." },
                { title: "Preferenciais (PN)", content: "Dão preferência no recebimento de dividendos." },
                { title: "IPO", content: "A primeira vez que uma empresa vende ações na bolsa." }
              ]}
            />

            <InteractiveCard
              title="Fundos Imobiliários (FIIs)"
              description="Investem em empreendimentos imobiliários, como shoppings e escritórios."
              details={[
                { title: "Tipos", content: "Fundos de \"tijolo\" (imóveis físicos) e de \"papel\" (títulos de crédito imobiliário)." },
                { title: "Vantagem", content: "Recebimento de aluguéis mensais, isentos de IR para pessoa física." }
              ]}
            />

            <InteractiveCard
              title="ETFs e BDRs"
              description="Formas de diversificar seus investimentos de forma simples."
              details={[
                { title: "ETFs", content: "Fundos que replicam um índice da bolsa (ex: Ibovespa). É como comprar uma cesta de ações de uma vez." },
                { title: "BDRs", content: "Permitem investir em empresas estrangeiras (como Apple, Google) diretamente pela bolsa brasileira." }
              ]}
            />
          </div>
        </section>

        {/* Calculadora Section */}
        <section id="calculadora" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Calculadora de Juros</h2>
          <p className="text-gray-500 mb-8">
            Veja na prática a diferença entre juros simples e compostos. Preencha os campos abaixo e visualize o poder 
            da capitalização ao longo do tempo.
          </p>
          
          <CompoundInterestCalculator />
        </section>
      </main>
    </div>
  );
}

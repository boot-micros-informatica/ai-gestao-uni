import { Layout } from "@/components/Layout";
import { DashboardCard } from "@/components/DashboardCard";
import { Building2, Briefcase, Landmark, TrendingUp, Users, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Visão Geral do Sistema
          </h2>
          <p className="text-muted-foreground">
            Monitoramento integrado das secretarias municipais gerenciado por IA
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="SEMPOG"
            description="Secretaria de Planejamento"
            icon={Building2}
            value="142"
            trend="+12% este mês"
            color="primary"
          />
          <DashboardCard
            title="SEMAD"
            description="Secretaria de Administração"
            icon={Briefcase}
            value="89"
            trend="+8% este mês"
            color="secondary"
          />
          <DashboardCard
            title="SEMFAZ"
            description="Secretaria de Fazenda"
            icon={Landmark}
            value="R$ 2.4M"
            trend="+15% este mês"
            color="accent"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gradient-card shadow-card animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Análise da IA
              </CardTitle>
              <CardDescription>
                Insights e recomendações automáticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-foreground mb-1">
                  Eficiência Operacional
                </p>
                <p className="text-xs text-muted-foreground">
                  Sistema operando com 94% de eficiência. Recomenda-se otimização nos processos da SEMAD.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-foreground mb-1">
                  Previsão de Demanda
                </p>
                <p className="text-xs text-muted-foreground">
                  Aumento esperado de 18% nas solicitações da SEMPOG no próximo trimestre.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas atualizações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Novo registro em SEMPOG
                  </p>
                  <p className="text-xs text-muted-foreground">Há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Atualização processada em SEMAD
                  </p>
                  <p className="text-xs text-muted-foreground">Há 12 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Relatório gerado em SEMFAZ
                  </p>
                  <p className="text-xs text-muted-foreground">Há 25 minutos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-primary text-white shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Status da Inteligência Artificial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm opacity-90 mb-1">Processamento</p>
                <p className="text-2xl font-bold">99.8%</p>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-1">Tempo de Resposta</p>
                <p className="text-2xl font-bold">0.3s</p>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-1">Precisão</p>
                <p className="text-2xl font-bold">97.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

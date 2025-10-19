import { Layout } from "@/components/Layout";
import { Users, Shield, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "@/components/DashboardCard";

const Admin = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Administração & Gestão Interna</h2>
            <p className="text-muted-foreground">
              Painel de controle e gerenciamento do sistema
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Usuários Ativos"
            description="Total de usuários no sistema"
            icon={Users}
            value="47"
            trend="+3 esta semana"
            color="primary"
          />
          <DashboardCard
            title="Processos Ativos"
            description="Em andamento"
            icon={Activity}
            value="234"
            trend="+18 hoje"
            color="secondary"
          />
          <DashboardCard
            title="Segurança"
            description="Status do sistema"
            icon={Shield}
            value="100%"
            trend="Todos os sistemas OK"
            color="accent"
          />
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Logs do Sistema</CardTitle>
            <CardDescription>Atividades recentes da administração</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Sistema inicializado</p>
                <p className="text-xs text-muted-foreground">Todos os módulos carregados com sucesso</p>
                <p className="text-xs text-muted-foreground mt-1">Hoje às 08:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Backup automático concluído</p>
                <p className="text-xs text-muted-foreground">Dados sincronizados com sucesso</p>
                <p className="text-xs text-muted-foreground mt-1">Hoje às 06:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;

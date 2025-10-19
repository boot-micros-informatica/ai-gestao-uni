import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
            <p className="text-muted-foreground">
              Personalize o sistema de acordo com suas necessidades
            </p>
          </div>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Configurações do Sistema</CardTitle>
            <CardDescription>
              Opções de personalização e ajustes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Painel de configurações em desenvolvimento. Funcionalidades serão adicionadas conforme necessário.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;

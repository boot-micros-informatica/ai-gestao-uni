import { Layout } from "@/components/Layout";
import { Landmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Semfaz = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Landmark className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">SEMFAZ</h2>
            <p className="text-muted-foreground">
              Secretaria de Fazenda
            </p>
          </div>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Dados da Secretaria</CardTitle>
            <CardDescription>
              Aguardando integração dos dados de tabelas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Esta seção será preenchida com os dados específicos da SEMFAZ após você fornecer as informações das tabelas.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Semfaz;

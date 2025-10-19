import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ComplaintCardProps {
  complaint: {
    id: string;
    complaint_text: string;
    status: "recebido" | "executando" | "finalizado";
    created_at: string;
    location_address?: string;
    latitude?: number;
    longitude?: number;
    complaint_photos?: Array<{ photo_url: string }>;
  };
  onStatusChange?: (id: string, newStatus: "recebido" | "executando" | "finalizado") => void;
}

const statusColors = {
  recebido: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  executando: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  finalizado: "bg-green-500/10 text-green-500 border-green-500/20",
};

const statusLabels = {
  recebido: "Recebido",
  executando: "Em Execução",
  finalizado: "Finalizado",
};

export const ComplaintCard = ({ complaint, onStatusChange }: ComplaintCardProps) => {
  return (
    <Card className="bg-gradient-card hover:shadow-card transition-all">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusColors[complaint.status]}>
              {statusLabels[complaint.status]}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(new Date(complaint.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground leading-relaxed">{complaint.complaint_text}</p>
        
        {complaint.location_address && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{complaint.location_address}</span>
          </div>
        )}

        {complaint.complaint_photos && complaint.complaint_photos.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="w-4 h-4" />
            <span>{complaint.complaint_photos.length} foto(s) anexada(s)</span>
          </div>
        )}

        {onStatusChange && (
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onStatusChange(complaint.id, "recebido")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                complaint.status === "recebido"
                  ? "bg-blue-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Recebido
            </button>
            <button
              onClick={() => onStatusChange(complaint.id, "executando")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                complaint.status === "executando"
                  ? "bg-yellow-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Executando
            </button>
            <button
              onClick={() => onStatusChange(complaint.id, "finalizado")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                complaint.status === "finalizado"
                  ? "bg-green-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Finalizado
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

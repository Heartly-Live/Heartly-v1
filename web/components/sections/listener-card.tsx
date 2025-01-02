import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ListenerCardProps {
  name: string;
  credentials: string;
  rating: number;
  calls: number;
}

export default function ListenerCard({
  name,
  credentials,
  rating,
  calls,
}: ListenerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" alt={name} />
            <AvatarFallback>PL</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="font-medium">{name}</h3>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{credentials}</div>
            <div className="text-sm text-muted-foreground">{calls} calls</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

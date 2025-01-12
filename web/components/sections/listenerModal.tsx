"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Phone, Star, Video } from "lucide-react";
import { useRouter } from "next/navigation";

interface ListenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listener: {
    name: string;
    credentials: string;
    rating: number;
    calls: number;
    expertAddress: string;
    voiceRate: number;
    videoRate: number;
  } | null;
}

export default function ListenerModal({
  isOpen,
  onClose,
  listener,
}: ListenerModalProps) {
  const router = useRouter();

  if (!listener) return null;

  const handleBeginClick = () => {
    onClose();
    router.push("/app/call/0");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-white/80 backdrop-blur-sm" />
        <DialogContent className="max-w-[320px] border-none bg-gradient-to-b from-[#FFA2C933] to-[#FEBF5D33] shadow-none p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4">
            <DialogTitle className="text-2xl font-bold text-center">
              Ready when you are
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              You are hopping on a call with
            </p>

            <Card className="w-full bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" alt={listener.name} />
                    <AvatarFallback>PL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 truncate">
                        <h3 className="font-medium truncate">
                          {listener.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">
                          {listener.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {listener.credentials}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {listener.calls} calls
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">
                      ${listener.voiceRate / 10 ** 6}/min
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">
                      ${listener.videoRate / 10 ** 6}/min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-4 w-full pt-2">
              <Button
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-orange-300 to-pink-300 hover:opacity-90 transition-opacity rounded-full"
                onClick={handleBeginClick}
              >
                Begin
              </Button>
              <button
                onClick={onClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Explore More <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

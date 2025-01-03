"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ListenerRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ListenerRegistrationDialog({
  open,
  onOpenChange,
}: ListenerRegistrationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    voiceRate: "",
    videoRate: "",
    image: null as File | null,
  });

  const handleSubmit = () => {
    // Handle registration logic here
    console.log("Submitting:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Become a Listener
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={
                  formData.image
                    ? URL.createObjectURL(formData.image)
                    : "/placeholder.svg"
                }
                alt="Profile preview"
              />
              <AvatarFallback>PL</AvatarFallback>
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, image: file }));
                }
              }}
            />
            <Label
              htmlFor="image-upload"
              className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
            >
              Upload Profile Picture
            </Label>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label>Expertise</Label>
              <Input
                value={formData.expertise}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expertise: e.target.value,
                  }))
                }
                placeholder="e.g., Clinical Psychology"
              />
            </div>

            <div className="space-y-2">
              <Label>Voice Call Rate (per minute)</Label>
              <Input
                type="number"
                value={formData.voiceRate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    voiceRate: e.target.value,
                  }))
                }
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>Video Call Rate (per minute)</Label>
              <Input
                type="number"
                value={formData.videoRate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    videoRate: e.target.value,
                  }))
                }
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white"
            onClick={handleSubmit}
            disabled={
              !formData.name ||
              !formData.expertise ||
              !formData.voiceRate ||
              !formData.videoRate
            }
          >
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

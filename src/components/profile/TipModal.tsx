
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Pi } from "lucide-react";
import { motion } from "framer-motion";

interface TipModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  onSubmit: (amount: number, message: string) => void;
  isProcessing: boolean;
}

const TipModal = ({
  isOpen,
  onOpenChange,
  username,
  onSubmit,
  isProcessing,
}: TipModalProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleSubmit = () => {
    if (amount > 0) {
      onSubmit(amount, message);
    }
  };

  const predefinedAmounts = [1, 5, 10, 25];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pi className="h-5 w-5" /> Tip @{username}
          </DialogTitle>
          <DialogDescription>
            Support {username} with Pi cryptocurrency. The funds will be transferred directly to their wallet.
          </DialogDescription>
        </DialogHeader>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (Pi)
            </label>
            <Input
              id="amount"
              type="number"
              min="0.1"
              step="0.1"
              value={amount}
              onChange={handleAmountChange}
              disabled={isProcessing}
              className="transition-all duration-200"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {predefinedAmounts.map((presetAmount) => (
                <motion.div
                  key={presetAmount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    className={`cursor-pointer hover:bg-secondary transition-colors duration-200 ${amount === presetAmount ? 'bg-secondary text-secondary-foreground' : ''}`}
                    onClick={() => setAmount(presetAmount)}
                  >
                    {presetAmount} Pi
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (optional)
            </label>
            <Textarea
              id="message"
              placeholder="Add a message with your tip..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isProcessing}
              className="transition-all duration-200"
            />
          </div>
        </motion.div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleSubmit} 
              disabled={amount <= 0 || isProcessing}
              className="relative overflow-hidden group"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Send {amount} Pi</>
              )}
              <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TipModal;

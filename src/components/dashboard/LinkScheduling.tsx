
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FeatureGate from "@/components/FeatureGate";

interface LinkSchedulingProps {
  linkId: string;
  linkTitle: string;
  isScheduled: boolean;
  scheduledStart?: Date;
  scheduledEnd?: Date;
  onUpdateSchedule: (linkId: string, start: Date | null, end: Date | null) => void;
}

const LinkScheduling = ({ 
  linkId, 
  linkTitle, 
  isScheduled, 
  scheduledStart, 
  scheduledEnd, 
  onUpdateSchedule 
}: LinkSchedulingProps) => {
  const [enabled, setEnabled] = useState(isScheduled);
  const [startDate, setStartDate] = useState(
    scheduledStart ? scheduledStart.toISOString().slice(0, 16) : ''
  );
  const [endDate, setEndDate] = useState(
    scheduledEnd ? scheduledEnd.toISOString().slice(0, 16) : ''
  );

  const handleSave = () => {
    if (enabled && startDate && endDate) {
      onUpdateSchedule(linkId, new Date(startDate), new Date(endDate));
    } else {
      onUpdateSchedule(linkId, null, null);
    }
  };

  return (
    <FeatureGate 
      feature="hasScheduling" 
      featureName="Link Scheduling"
      fallback={
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              Schedule Link
            </CardTitle>
            <CardDescription className="text-xs">
              Pro feature - Schedule when links are visible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upgrade to Pro to schedule links</p>
            </div>
          </CardContent>
        </Card>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            Schedule "{linkTitle}"
          </CardTitle>
          <CardDescription className="text-xs">
            Control when this link is visible to visitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="schedule-enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
            <Label htmlFor="schedule-enabled" className="text-sm">
              Enable scheduling
            </Label>
          </div>
          
          {enabled && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="start-date" className="text-xs">Start Date & Time</Label>
                <Input
                  id="start-date"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="end-date" className="text-xs">End Date & Time</Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              
              <Button onClick={handleSave} size="sm" className="w-full">
                Save Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </FeatureGate>
  );
};

export default LinkScheduling;

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlaygroundBookings } from "@/hooks/use-playgrounds";
import type { Playground } from "@/hooks/use-playgrounds";

interface BookingSlotPickerProps {
  playground: Playground;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedSlots: string[];
  onSlotsChange: (slots: string[]) => void;
}

function generateTimeSlots(opening: string, closing: string): string[] {
  const slots: string[] = [];
  const startHour = parseInt(opening.split(":")[0]);
  const endHour = parseInt(closing.split(":")[0]);
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

export default function BookingSlotPicker({
  playground,
  selectedDate,
  onDateChange,
  selectedSlots,
  onSlotsChange,
}: BookingSlotPickerProps) {
  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { data: existingBookings = [] } = usePlaygroundBookings(playground.id, dateStr);

  const allSlots = useMemo(
    () => generateTimeSlots(playground.opening_time, playground.closing_time),
    [playground.opening_time, playground.closing_time]
  );

  const bookedSlots = useMemo(() => {
    const set = new Set<string>();
    existingBookings.forEach((b) => {
      const startH = parseInt(b.start_time.split(":")[0]);
      const endH = parseInt(b.end_time.split(":")[0]);
      for (let h = startH; h < endH; h++) {
        set.add(`${h.toString().padStart(2, "0")}:00`);
      }
    });
    return set;
  }, [existingBookings]);

  const toggleSlot = (slot: string) => {
    if (bookedSlots.has(slot)) return;
    if (selectedSlots.includes(slot)) {
      onSlotsChange(selectedSlots.filter((s) => s !== slot));
    } else {
      onSlotsChange([...selectedSlots, slot].sort());
    }
  };

  const isPast = (slot: string) => {
    if (!selectedDate) return false;
    const today = new Date();
    if (format(selectedDate, "yyyy-MM-dd") > format(today, "yyyy-MM-dd")) return false;
    if (format(selectedDate, "yyyy-MM-dd") < format(today, "yyyy-MM-dd")) return true;
    return parseInt(slot) <= today.getHours();
  };

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-2 block">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-2 block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Select Time Slots
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {allSlots.map((slot) => {
              const booked = bookedSlots.has(slot);
              const past = isPast(slot);
              const selected = selectedSlots.includes(slot);
              const disabled = booked || past;
              const endHour = parseInt(slot) + 1;
              return (
                <button
                  key={slot}
                  disabled={disabled}
                  onClick={() => toggleSlot(slot)}
                  className={cn(
                    "py-2 px-1 rounded-lg text-xs font-medium border transition-all",
                    disabled && "opacity-40 cursor-not-allowed bg-muted line-through",
                    selected && !disabled && "bg-primary text-primary-foreground border-primary shadow-glow",
                    !selected && !disabled && "border-border hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {slot}–{endHour.toString().padStart(2, "0")}:00
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border border-border" /> Available</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary" /> Selected</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted line-through" /> Booked</span>
          </div>
        </div>
      )}
    </div>
  );
}

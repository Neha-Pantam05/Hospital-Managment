import { useState } from "react";
import { MedicalRecord } from "./patient-details";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogFooter
  } from '@/components/ui/dialog';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
export const AddMedicalRecordDialog = ({ onAdd }: { onAdd: (record: Omit<MedicalRecord, 'id'>) => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: getTodayDate(),
      diagnosis: '',
      medicineType: 'Tablet' as MedicalRecord['medicineType'],
      medicineName: '',
      note: '',
    });
  
    const handleAdd = () => {
      onAdd(formData);
      setFormData({
        date: getTodayDate(),
        diagnosis: '',
        medicineType: 'Tablet',
        medicineName: '',
        note: '',
      });
      setOpen(false);
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
            <Plus className="w-4 h-4" />
            Add Medical Record
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Medical Record</DialogTitle>
            <DialogDescription>Record patient visit and prescription details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Visit Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input
                id="diagnosis"
                placeholder="Enter diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicineType">Medicine Type</Label>
              <Select value={formData.medicineType} onValueChange={(value) => setFormData({ ...formData, medicineType: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Powder">Powder</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicineName">Medicine Name</Label>
              <Input
                id="medicineName"
                placeholder="Enter medicine name and dosage"
                value={formData.medicineName}
                onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Notes (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Additional instructions or notes"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
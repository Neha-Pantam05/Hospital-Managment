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
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

// Interface for individual medicine
interface Medicine {
  type: MedicalRecord['medicineType'];
  name: string;
}

export const AddMedicalRecordDialog = ({ onAdd }: { onAdd: (record: Omit<MedicalRecord, 'id'>) => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: getTodayDate(),
      diagnosis: '',
      medicines: [] as Medicine[],
      note: '',
    });

    // Add a new empty medicine
    const addMedicine = () => {
        setFormData(prev => ({
            ...prev,
            medicines: [
                ...prev.medicines,
                { type: 'Tablet', name: '' }
            ]
        }));
    };

    // Update a specific medicine
    const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
        setFormData(prev => ({
            ...prev,
            medicines: prev.medicines.map((medicine, i) => 
                i === index ? { ...medicine, [field]: value } : medicine
            )
        }));
    };

    // Remove a medicine
    const removeMedicine = (index: number) => {
        setFormData(prev => ({
            ...prev,
            medicines: prev.medicines.filter((_, i) => i !== index)
        }));
    };

    const handleAdd = () => {
        // Filter out empty medicines
        const validMedicines = formData.medicines.filter(med => med.name.trim() !== '');
        
        if (validMedicines.length === 0) {
            alert("Please add at least one medicine");
            return;
        }

        // Convert to the format expected by MedicalRecord
        const recordData = {
            date: formData.date,
            diagnosis: formData.diagnosis,
            medicineType: validMedicines.map(med => med.type).join(', '),
            medicineName: validMedicines.map(med => med.name).join(', '),
            note: formData.note,
        };

        onAdd(recordData);
        
        // Reset form
        setFormData({
            date: getTodayDate(),
            diagnosis: '',
            medicines: [],
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

            {/* Medicines Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Medicines</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addMedicine}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Medicine
                </Button>
              </div>

              {formData.medicines.length === 0 ? (
                <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No medicines added yet</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addMedicine}
                    className="mt-2"
                  >
                    Add First Medicine
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.medicines.map((medicine, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Medicine {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicine(index)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`medicineType-${index}`}>Type</Label>
                          <Select 
                            value={medicine.type} 
                            onValueChange={(value) => updateMedicine(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tablet">Tablet</SelectItem>
                              <SelectItem value="Syrup">Syrup</SelectItem>
                              <SelectItem value="Powder">Powder</SelectItem>
                              <SelectItem value="Capsule">Capsule</SelectItem>
                              <SelectItem value="Injection">Injection</SelectItem>
                              <SelectItem value="Ointment">Ointment</SelectItem>
                              <SelectItem value="Drops">Drops</SelectItem>
                              <SelectItem value="Inhaler">Inhaler</SelectItem>
                              <SelectItem value="Inhaler">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`medicineName-${index}`}>Medicine Name *</Label>
                          <Input
                            id={`medicineName-${index}`}
                            placeholder="Enter medicine name"
                            value={medicine.name}
                            onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Additional Notes (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Additional instructions, precautions, or notes"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAdd} 
              className="bg-teal-600 hover:bg-teal-700"
              disabled={formData.medicines.length === 0 || !formData.diagnosis.trim()}
            >
              Add Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};
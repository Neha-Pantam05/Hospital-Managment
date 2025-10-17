'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { UserPlus, User, Phone, Calendar, Ruler, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface PatientData {
  name: string;
  age: string;
  mobile: string;
  gender: string;
}

const AddPatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: '',
    mobile: '',
    gender: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    
    console.log('Submitting Patient Data:', formData);

    
    toast.success("Attempting to register patient");

    
    setFormData({ name: '', age: '', mobile: '', gender: '' });
  };

  
  const getInputClass = (): string =>
    `w-full pl-10 pr-3 py-2 border rounded-lg transition-all focus:ring-2 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-100 shadow-sm`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-start justify-center font-sans">
      <Card className="w-full max-w-lg shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 p-6">
          <CardTitle className="flex items-center gap-3 text-white text-3xl font-extrabold tracking-tight">
            <UserPlus className="w-7 h-7" />
            New Patient Registration
          </CardTitle>
          <CardDescription className="text-blue-100 mt-1 text-sm font-light">
            Fill in the details below to securely register a new patient.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            

            <div>
              <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block text-sm">Patient Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClass()}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              

              <div>
                <Label htmlFor="age" className="text-gray-700 font-semibold mb-2 block text-sm">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 35"
                    value={formData.age}
                    onChange={handleChange}
                    className={getInputClass()}
                    min="1"
                    required
                  />
                </div>
              </div>


              <div>
                <Label htmlFor="gender" className="text-gray-700 font-semibold mb-2 block text-sm">Gender</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                  <Select value={formData.gender} onValueChange={handleSelectChange}>
                    <SelectTrigger 
                        className={`${getInputClass()} flex items-center h-10`}> 
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            
            <div>
              <Label htmlFor="mobile" className="text-gray-700 font-semibold mb-2 block text-sm">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10 digit number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={getInputClass()}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200/50 flex items-center gap-2 mt-8"
            >
              <Save className="w-5 h-5" />
              Register Patient
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPatientForm;

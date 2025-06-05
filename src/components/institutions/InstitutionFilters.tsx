
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InstitutionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  sectors: string[];
}

const InstitutionFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  sectors
}: InstitutionFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search institutions, programs, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>
                  {sector === 'all' ? 'All Institutions' : sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstitutionFilters;

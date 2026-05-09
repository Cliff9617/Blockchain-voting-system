import React, { useState, useEffect } from 'react';
import { POSITIONS, POSITION_NAMES, getPositionIndex } from '../utils/electionFilters';
import { counties, constituencies, wards } from '../data/kenyaLocations';

// Position options for dropdown
const POSITION_OPTIONS = [
  { value: 'president', label: 'President (National)', index: 0 },
  { value: 'governor', label: 'Governor (County)', index: 1 },
  { value: 'senator', label: 'Senator (County)', index: 2 },
  { value: 'woman representative', label: 'Woman Representative (County)', index: 3 },
  { value: 'member of parliament', label: 'Member of Parliament (Constituency)', index: 4 },
  { value: 'mca', label: 'MCA (Ward)', index: 5 },
];

// Get fields to show based on position
const getRequiredFields = (position) => {
  switch (position) {
    case 'president':
      return { showCounty: false, showConstituency: false, showWard: false, countyRequired: false, constituencyRequired: false, wardRequired: false };
    case 'governor':
    case 'senator':
    case 'woman representative':
      return { showCounty: true, showConstituency: false, showWard: false, countyRequired: true, constituencyRequired: false, wardRequired: false };
    case 'member of parliament':
      return { showCounty: true, showConstituency: true, showWard: false, countyRequired: true, constituencyRequired: true, wardRequired: false };
    case 'mca':
      return { showCounty: true, showConstituency: true, showWard: true, countyRequired: true, constituencyRequired: true, wardRequired: true };
    default:
      return { showCounty: false, showConstituency: false, showWard: false, countyRequired: false, constituencyRequired: false, wardRequired: false };
  }
};

const AddCandidate = ({ contract, isLoading, onAddCandidate }) => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    position: 'president',
    county: '',
    constituency: '',
    ward: '',
    candidateCode: '',
    imageUrl: '',
  });
  const [status, setStatus] = useState('');
  const [availableConstituencies, setAvailableConstituencies] = useState([]);
  const [availableWards, setAvailableWards] = useState([]);

  const fields = getRequiredFields(formData.position);

  // Update constituencies when county changes
  useEffect(() => {
    if (formData.county && counties[formData.county]) {
      setAvailableConstituencies(counties[formData.county] || []);
    } else {
      setAvailableConstituencies([]);
    }
    setFormData(prev => ({ ...prev, constituency: '', ward: '' }));
    setAvailableWards([]);
  }, [formData.county]);

  // Update wards when constituency changes
  useEffect(() => {
    if (formData.constituency && constituencies[formData.constituency]) {
      setAvailableWards(constituencies[formData.constituency] || []);
    } else {
      setAvailableWards([]);
    }
    setFormData(prev => ({ ...prev, ward: '' }));
  }, [formData.constituency]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus("Please enter a candidate name");
      return false;
    }
    if (!formData.party.trim()) {
      setStatus("Please enter the candidate's party or 'Independent'");
      return false;
    }

    // Validate geographical fields based on position
    if (fields.countyRequired && !formData.county) {
      setStatus("Please select a county");
      return false;
    }
    if (fields.constituencyRequired && !formData.constituency) {
      setStatus("Please select a constituency");
      return false;
    }
    if (fields.wardRequired && !formData.ward) {
      setStatus("Please select a ward");
      return false;
    }

    return true;
  };

  const handleAddCandidate = async () => {
    if (!validateForm()) return;

    try {
      setStatus("Adding candidate to blockchain...");
      
      const positionIndex = getPositionIndex(formData.position);
      
      const candidateData = {
        name: formData.name.trim(),
        party: formData.party.trim(),
        position: formData.position,
        positionIndex: positionIndex,
        county: formData.county || '',
        constituency: formData.constituency || '',
        ward: formData.ward || '',
        candidateCode: formData.candidateCode || '',
        imageUrl: formData.imageUrl || '',
      };

      console.log('[AddCandidate] Adding candidate:', candidateData);
      
      await onAddCandidate(candidateData);
      setStatus("Candidate added successfully!");
      
      // Reset form
      setFormData({
        name: '',
        party: '',
        position: 'president',
        county: '',
        constituency: '',
        ward: '',
        candidateCode: '',
        imageUrl: '',
      });
    } catch (err) {
      console.error(err);
      setStatus("Failed to add candidate: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Candidate</h3>
      
      <div className="space-y-4">
        {/* Candidate Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter candidate name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Party */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Party / Independent *
          </label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleInputChange}
            placeholder="e.g. UDA, ODM, Wiper, Independent..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position *
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          >
            {POSITION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* County */}
        {fields.showCounty && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              County {fields.countyRequired && '*'}
            </label>
            <select
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            >
              <option value="">Select County</option>
              {Object.keys(counties).map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
        )}

        {/* Constituency */}
        {fields.showConstituency && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Constituency {fields.constituencyRequired && '*'}
            </label>
            <select
              name="constituency"
              value={formData.constituency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            >
              <option value="">Select Constituency</option>
              {availableConstituencies.map(constituency => (
                <option key={constituency} value={constituency}>{constituency}</option>
              ))}
            </select>
          </div>
        )}

        {/* Ward */}
        {fields.showWard && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ward {fields.wardRequired && '*'}
            </label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            >
              <option value="">Select Ward</option>
              {availableWards.map(ward => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
          </div>
        )}

        {/* Candidate Code (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Code (Optional)
          </label>
          <input
            type="text"
            name="candidateCode"
            value={formData.candidateCode}
            onChange={handleInputChange}
            placeholder="e.g. PRES-001, GOV-NBO-01..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Internal reference code for the candidate
          </p>
        </div>

        {/* Image URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/candidate-photo.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddCandidate}
            disabled={isLoading || !formData.name.trim()}
            className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Add Candidate"
            )}
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`p-3 rounded-lg ${
            status.includes("successfully") || status.includes("success")
              ? "bg-green-50 border border-green-200 text-green-800" 
              : "bg-red-50 border border-red-200 text-red-800"
          }`}>
            <p className="text-sm">{status}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Position & Area Requirements:</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>President:</strong> National position, no geographical area needed</li>
            <li>• <strong>Governor/Senator/Woman Rep:</strong> County-level position</li>
            <li>• <strong>MP:</strong> Constituency-level position</li>
            <li>• <strong>MCA:</strong> Ward-level position</li>
          </ul>
        </div>

        <div className="mt-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Note:</h4>
          <p className="text-sm text-purple-700">
            Candidates can only be added before the election starts. Once the election begins, 
            no new candidates can be added to ensure election integrity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
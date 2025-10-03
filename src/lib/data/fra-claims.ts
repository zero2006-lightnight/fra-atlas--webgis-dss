export interface FRAClaim {
  id: string;
  claimant: string;
  state: 'Madhya Pradesh' | 'Tripura' | 'Odisha' | 'Telangana';
  district: string;
  village: string;
  claimType: 'IFR' | 'CFR';
  landArea: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
  submittedDate: string;
  coordinates: [number, number];
  contactNumber: string;
}

export const sampleClaims: FRAClaim[] = [
  {
    id: 'FRA-MP-2024-001',
    claimant: 'Ramesh Kumar',
    state: 'Madhya Pradesh',
    district: 'Balaghat',
    village: 'Kirnapur',
    claimType: 'IFR',
    landArea: 2.5,
    status: 'Pending',
    priority: 'High',
    submittedDate: '2024-01-15',
    coordinates: [21.8047, 80.1897],
    contactNumber: '+91-9876543210',
  },
  {
    id: 'FRA-OD-2024-002',
    claimant: 'Anjali Sahoo',
    state: 'Odisha',
    district: 'Mayurbhanj',
    village: 'Baripada',
    claimType: 'CFR',
    landArea: 15.0,
    status: 'Approved',
    priority: 'Medium',
    submittedDate: '2024-01-10',
    coordinates: [21.9347, 86.7337],
    contactNumber: '+91-9876543211',
  },
  {
    id: 'FRA-TG-2024-003',
    claimant: 'Venkata Reddy',
    state: 'Telangana',
    district: 'Adilabad',
    village: 'Utnoor',
    claimType: 'IFR',
    landArea: 3.2,
    status: 'Under Review',
    priority: 'High',
    submittedDate: '2024-01-20',
    coordinates: [19.6692, 78.3951],
    contactNumber: '+91-9876543212',
  },
  {
    id: 'FRA-TR-2024-004',
    claimant: 'Debashis Tripura',
    state: 'Tripura',
    district: 'West Tripura',
    village: 'Khowai',
    claimType: 'CFR',
    landArea: 8.5,
    status: 'Pending',
    priority: 'Medium',
    submittedDate: '2024-01-18',
    coordinates: [23.8315, 91.2868],
    contactNumber: '+91-9876543213',
  },
  {
    id: 'FRA-MP-2024-005',
    claimant: 'Sunita Devi',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    village: 'Nainpur',
    claimType: 'IFR',
    landArea: 1.8,
    status: 'Approved',
    priority: 'Low',
    submittedDate: '2024-01-05',
    coordinates: [22.4297, 80.1046],
    contactNumber: '+91-9876543214',
  },
  {
    id: 'FRA-OD-2024-006',
    claimant: 'Bikash Patra',
    state: 'Odisha',
    district: 'Koraput',
    village: 'Jeypore',
    claimType: 'IFR',
    landArea: 4.0,
    status: 'Rejected',
    priority: 'Low',
    submittedDate: '2023-12-28',
    coordinates: [18.8562, 82.5676],
    contactNumber: '+91-9876543215',
  },
  {
    id: 'FRA-TG-2024-007',
    claimant: 'Lakshmi Bai',
    state: 'Telangana',
    district: 'Khammam',
    village: 'Bhadrachalam',
    claimType: 'CFR',
    landArea: 12.0,
    status: 'Under Review',
    priority: 'High',
    submittedDate: '2024-01-22',
    coordinates: [17.6689, 80.8936],
    contactNumber: '+91-9876543216',
  },
  {
    id: 'FRA-TR-2024-008',
    claimant: 'Ranjit Debbarma',
    state: 'Tripura',
    district: 'Dhalai',
    village: 'Ambassa',
    claimType: 'IFR',
    landArea: 2.2,
    status: 'Pending',
    priority: 'Medium',
    submittedDate: '2024-01-25',
    coordinates: [23.9376, 91.8520],
    contactNumber: '+91-9876543217',
  },
  {
    id: 'FRA-MP-2024-009',
    claimant: 'Gopal Singh',
    state: 'Madhya Pradesh',
    district: 'Chhindwara',
    village: 'Parasia',
    claimType: 'IFR',
    landArea: 3.5,
    status: 'Approved',
    priority: 'Medium',
    submittedDate: '2024-01-12',
    coordinates: [22.0697, 78.7378],
    contactNumber: '+91-9876543218',
  },
  {
    id: 'FRA-OD-2024-010',
    claimant: 'Sumitra Majhi',
    state: 'Odisha',
    district: 'Sundargarh',
    village: 'Rourkela',
    claimType: 'CFR',
    landArea: 20.0,
    status: 'Under Review',
    priority: 'High',
    submittedDate: '2024-01-28',
    coordinates: [22.2604, 84.8536],
    contactNumber: '+91-9876543219',
  },
];

export const stateCoordinates = {
  'Madhya Pradesh': [23.4734, 77.9472] as [number, number],
  'Tripura': [23.9408, 91.9882] as [number, number],
  'Odisha': [20.9517, 85.0985] as [number, number],
  'Telangana': [18.1124, 79.0193] as [number, number],
};

export const getClaimsByState = (state: string) => {
  return sampleClaims.filter((claim) => claim.state === state);
};

export const getClaimsByStatus = (status: string) => {
  return sampleClaims.filter((claim) => claim.status === status);
};

export const getClaimStats = () => {
  const total = sampleClaims.length;
  const pending = sampleClaims.filter((c) => c.status === 'Pending').length;
  const approved = sampleClaims.filter((c) => c.status === 'Approved').length;
  const rejected = sampleClaims.filter((c) => c.status === 'Rejected').length;
  const underReview = sampleClaims.filter((c) => c.status === 'Under Review').length;

  return { total, pending, approved, rejected, underReview };
};
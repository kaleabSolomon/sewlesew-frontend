export interface CampaignPreview {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  deadline: string;
  status: string;
  businessId: string | null;
  charityId: string | null;
  charity: {
    isOrganization: boolean;
  } | null;
  campaignMedia: [
    {
      id: string;
      url: string;
    }
  ];
  _count: {
    Donation: number;
  };
}

export interface ICampaignDetail {
  id: string;
  userId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  deadline: string;
  createdAt: string;
  status: string;

  charity: {
    id: string;
    fullName: string;
    isOrganization: boolean;
    website: string | null;
    publicEmail: string | null;
    publicPhoneNumber: string | null;
    region: string;
    city: string;
    relativeLocation: string | null;
  } | null;
  campaignMedia: [
    {
      id: string;
      imageType: string;
      url: string;
    }
  ];

  user: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
  business: {
    id: string;
    fullName: string;
    website: string | null;
    sector: string;
    publicEmail: string | null;
    publicPhoneNumber: string | null;
    region: string;
    city: string;
    relativeLocation: string | null;
  } | null;
  Donation: [
    {
      id: string;
      amount: number;
      paymentStatus: string;
      donorFirstName: string;
      donorLastName: string;
      isAnonymous: boolean;
      createdAt: string;
    }
  ];
}

export interface campaignMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export interface Donation {
  id: string;
  amount: number;
  paymentStatus: string;
  donorFirstName: string;
  donorLastName: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface CampaignResipient {
  id: string;
  fullName: string;
  website: string | null;
  publicEmail: string | null;
  publicPhoneNumber: string | null;
  region: string;
  city: string;
  relativeLocation: string | null;
  isOrganization?: boolean;
  sector?: string;
}

export interface CampaignFormData {
  fullName: string;
  publicEmail: string;
  publicPhoneNumber?: string;
  contactEmail: string;
  contactPhoneNumber: string;
  region: string;
  city: string;
  relativeLocation: string;
  website?: string;
  sector?: string;
  category: string;
  tinNumber: string;
  licenseNumber: string;
  tinCertificate: File | null;
  registrationLicense: File | null;
  personalDocument: File | null;
  coverImage: File | null;
  otherImages: File[];
  supportingDocuments: File[];
  title: string;
  description: string;
  goalAmount: string;
  deadline: string;
  bankName: string;
  holderName: string;
  accountNumber: string;
}

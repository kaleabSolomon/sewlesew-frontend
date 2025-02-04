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
    isOrganizational: boolean;
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

export interface campaignMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

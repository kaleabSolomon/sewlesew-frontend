export interface CampaignPreview {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  deadline: string;
  status: string;
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

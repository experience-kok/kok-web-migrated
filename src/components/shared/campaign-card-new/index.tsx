import CampaignCardApplicantCount from './campaign-card-applicant-count';
import CampaignCardBadge from './campaign-card-badge';
import CampaignCardBase from './campaign-card-base';
import CampaignCardImage from './campaign-card-image';
import CampaignCardShortInfo from './campaign-card-short-info';
import CampaignCardTitle from './campaign-card-title';

export const CampaignCard = Object.assign(CampaignCardBase, {
  Image: CampaignCardImage,
  Badge: CampaignCardBadge,
  Title: CampaignCardTitle,
  ShortInfo: CampaignCardShortInfo,
  Applicant: CampaignCardApplicantCount,
});

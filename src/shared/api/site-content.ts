import type { SiteContent } from './types';
import { mockSiteContent } from './mocks/site-content';

export interface SiteContentRepository {
  getContent(): Promise<SiteContent>;
}

// Static pages use this boundary at build time. A NestJS adapter can replace
// the mock repository once the backend publishes its OpenAPI contract.
const repository: SiteContentRepository = {
  async getContent() {
    return structuredClone(mockSiteContent);
  },
};

export function getSiteContent(): Promise<SiteContent> {
  return repository.getContent();
}

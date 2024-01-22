import { Helmet } from 'react-helmet-async';

/* eslint-disable-next-line */
export interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function Meta({
  title = 'Welcome to ProShop',
  description = 'We sell best products for cheap',
  keywords = 'electronics, buy electronics, cheap electronics',
}: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

export default Meta;

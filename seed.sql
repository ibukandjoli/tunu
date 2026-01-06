-- INSERT A DEMO AUCTION
INSERT INTO public.auctions (
    title,
    slug,
    summary,
    description,
    start_price,
    current_price,
    min_increment,
    starts_at,
    ends_at,
    status
) VALUES (
    'Project Horizon - AI SaaS',
    'project-horizon',
    'A fully automated AI copywriting tool with $2k MRR.',
    '# Project Horizon

This is a **fully functional SaaS** built with:
- Next.js 14
- OpenAI API
- Stripe Billing

## Metrics
- **MRR**: $2,100
- **Users**: 1,500+
- **Churn**: < 5%

## What you get
- Full Source Code (GitHub)
- Domain Name
- Customer Database
- 30 Days of Support',
    5000, -- Start Price
    5000, -- Current Price (starts at this)
    100,  -- Min Increment
    now(),
    now() + interval '24 hours', -- Ends in 24h
    'active'
);

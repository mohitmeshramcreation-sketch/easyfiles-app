import { Metadata } from 'next';

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title: `${title} - EasyFiles`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image || '/og-image.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || '/og-image.png'],
      creator: '@easyfiles',
    },
    icons: {
      icon: '/favicon.ico',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

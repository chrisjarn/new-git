'use client'

import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'

interface FaqItem {
  id: number
  question: string
  answer: string | React.ReactNode
}

const faqsData: FaqItem[] = [
  {
    id: 1,
    question: 'How does ERA connect building owners and tenants?',
    answer:
      'ERA gives both parties shared visibility into emergency plans, warden assignments and compliance obligations, so everyone knows their role without chasing emails.',
  },
  {
    id: 2,
    question: 'Does ERA replace our existing emergency plans?',
    answer:
      'No, ERA digitises and centralises your existing plans, making them accessible to every stakeholder in real time and ensuring they stay current as requirements change.',
  },
  {
    id: 3,
    question: 'What standards does ERA align with?',
    answer:
      'ERA is built around Australian WHS legislation and aligns with AS 3745 emergency planning standards, helping PCBUs demonstrate compliance at every level.',
  },
  {
    id: 4,
    question: 'Can tenants access the system independently?',
    answer:
      "Yes, tenants get their own login to manage wardens, view site plans and log incidents. Their activity feeds into the building owner's portfolio dashboard automatically.",
  },
  {
    id: 5,
    question: 'How does ERA handle multi-site portfolios?',
    answer:
      'ERA provides a single dashboard across all your sites. Filter by building, region or compliance status to see exactly where attention is needed.',
  },
  {
    id: 6,
    question: 'How long does it take to get set up?',
    answer:
      'Most teams are live within 2 weeks. We handle onboarding, data migration, and training. You don\u2019t need an IT team.',
  },
  {
    id: 7,
    question: 'Is our data secure?',
    answer:
      'ERA is hosted in Australia on SOC 2-compliant infrastructure. Your data never leaves the region.',
  },
]

export function FAQ() {
  const [showAll, setShowAll] = useState(false)

  const allFaqs: FaqItem[] = [
    ...faqsData,
  ]

  const visibleFaqs = showAll ? allFaqs : allFaqs.slice(0, 4)

  return (
    <div>
      <Accordion type="single" collapsible>
        {visibleFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={String(faq.id)}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {!showAll && allFaqs.length > 4 && (
        <div className="mt-4 flex justify-center">
          <Button variant="plain" onClick={() => setShowAll(true)}>
            See more questions
          </Button>
        </div>
      )}
    </div>
  )
}

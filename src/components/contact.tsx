import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PageTitle, PageSubtitle } from '@/components/Layouts/PageHead'
import { Check } from '@gravity-ui/icons'

const benefits = ['Onboarding and data migration included', 'Dedicated account manager', 'Custom configuration for your portfolio', 'Live within 2 weeks']

export default function ContactSection() {
    return (
        <section className="py-24">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 md:px-6 lg:px-0">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <PageTitle className="max-w-[20ch]">Let&apos;s talk about your buildings</PageTitle>
                    <PageSubtitle className="max-w-[50ch]">Talk to our team about compliance, emergency readiness, and how ERA fits your portfolio.</PageSubtitle>
                </div>

                {/* Benefits + Form side by side */}
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                    <div className="flex flex-col gap-8">
                        <ul className="space-y-3">
                            {benefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-center gap-3">
                                    <Check className="size-4 shrink-0 fill-accent-green/25 text-accent-green" />
                                    <span className="text-base">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="text-secondary text-sm">
                            Have a general question?{' '}
                            <Link
                                href="mailto:support@erasafety.com.au"
                                className="text-brand-primary font-medium hover:underline">
                                Email our support team
                            </Link>
                        </div>

                        <div className="space-y-6 *:space-y-2">
                            <div>
                                <h3 className="text-tertiary text-sm">Email</h3>
                                <Link
                                    href="mailto:hello@erasafety.com.au"
                                    className="text-primary hover:decoration-brand-primary text-sm font-medium hover:underline">
                                    hello@erasafety.com.au
                                </Link>
                            </div>

                            <div>
                                <h3 className="text-tertiary text-sm">Based in</h3>
                                <p className="text-primary text-sm font-medium">
                                    Australia &amp; New Zealand
                                </p>
                            </div>
                        </div>
                    </div>

                    <Card className="flex flex-col bg-sand-1 p-6 shadow-xl md:p-12">
                        <h2 className="text-primary font-medium">Book a demo</h2>
                        <p className="text-secondary mt-2 text-sm">Fill out the form and we&apos;ll be in touch within 24 hours.</p>

                        <form className="**:data-[slot=label]:block relative mt-8 space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2.5">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input
                                        id="first-name"
                                        placeholder="Jane"
                                        required
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input
                                        id="last-name"
                                        placeholder="Smith"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="email">Work email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="jane@company.com.au"
                                    required
                                />
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    placeholder="Company name"
                                    required
                                />
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="message">How can we help?</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your buildings, team size, or compliance needs..."
                                    rows={5}
                                    className="min-h-32"
                                />
                            </div>

                            <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]">
                                <p className="text-tertiary text-sm">
                                    By submitting, you agree to our{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-brand-primary underline">
                                        Privacy Policy
                                    </Link>
                                </p>
                                <button
                                    type="submit"
                                    className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-brand-primary px-6 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90 max-sm:row-start-1"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    )
}

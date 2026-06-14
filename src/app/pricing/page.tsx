
import { Check, Zap, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Perfect for casual use and small files.',
      features: ['Up to 50MB file size', 'Basic AI Summary (3/day)', 'Standard processing', '24h data deletion'],
      button: 'Start for Free',
      variant: 'outline'
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/mo',
      desc: 'For power users needing more speed.',
      features: ['Up to 500MB file size', 'Unlimited AI Summary', 'Unlimited PDF Chat', 'Priority processing', 'No ads'],
      button: 'Upgrade to Pro',
      variant: 'default',
      popular: true
    },
    {
      name: 'Team',
      price: '$29',
      period: '/mo',
      desc: 'Collaboration for small teams.',
      features: ['Up to 2GB file size', 'Team shared workspace', 'Custom AI fine-tuning', 'API access (Beta)', 'Dedicated support'],
      button: 'Contact Sales',
      variant: 'outline'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">Simple Pricing</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Choose the plan that fits your workflow. No hidden fees. No credit card required to start.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`glass p-10 border-none relative flex flex-col ${plan.popular ? 'ring-2 ring-primary scale-105 shadow-2xl shadow-primary/20' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-4">{plan.desc}</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="h-5 w-5 text-secondary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant={plan.variant as any} className="w-full rounded-full h-12 font-bold text-lg">
              {plan.button}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

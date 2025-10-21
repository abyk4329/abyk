'use client';

import { Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SocialLinks } from '@/app/components/layout/SocialLinks';
import Card from '@/app/components/neu/Card';
import { Button } from '@/components/neu';
import { shareWithFriends } from '@/lib/domain/wealth-code/utils';
import { routes } from '@/lib/routes';

export function HomePageClient() {
  const router = useRouter();

  return (
    <main className="hero-shell homePageShell">
      <div className="homeContentRoot">
        <section className="homeHeroSection">
          <Card
            className="homeHeroCard"
            padding="none"
            data-hero-group="a"
            aria-labelledby="home-hero-heading"
          >
            <div className="homeHeroIcon" aria-hidden="true">
              <Hash strokeWidth={0.5} className="homeHeroIconGlyph" />
            </div>

            <div className="homeHeroContent">
              <h1 id="home-hero-heading" className="homeHeadline">
                גלו את <span className="homeHeadlineAccent">קוד העושר</span>{' '}
                שלכם
              </h1>
              <p className="homeSubtitle">
                תדר נומרולוגי אישי שמגלה את הדרך הטבעית שלך למגנט שפע, הצלחה
                ומימוש עצמי
              </p>
            </div>

            <Button
              variant="cta"
              className="btn-primary homeCta"
              onClick={() => router.push(routes.calculator)}
            >
              מחשבון קוד העושר
            </Button>
          </Card>
        </section>

        <section
          className="homeShareSection"
          aria-labelledby="homepage-share-heading"
        >
          <Card className="homeShareCard" padding="none">
            <div className="homeShareContent">
              <div className="homeShareCopy">
                <p className="homeShareSubtitle">
                  שלחו לחברים ולמשפחה הזמנה לגלות את עצמם בלחיצה אחת
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              className="btn-secondary homeShareButton"
              onClick={shareWithFriends}
            >
              שתפו עם מי שחשוב לכם
            </Button>
          </Card>
        </section>

        <section aria-label="קישורים לרשתות חברתיות">
          <SocialLinks />
        </section>
      </div>
    </main>
  );
}

export default HomePageClient;

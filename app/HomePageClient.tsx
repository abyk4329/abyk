'use client';

import { Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SocialLinks } from '@/app/components/layout/SocialLinks';
import Card from '@/app/components/neu/Card';
import { Button } from '@/components/neu';
import { shareWithFriends } from '@/lib/domain/wealth-code/utils';
import { routes } from '@/lib/routes';

import styles from './page.module.css';

export function HomePageClient() {
  const router = useRouter();

  return (
    <main className={`hero-shell ${styles.page} homePageShell`}>
      <div className={`${styles.homeContent} homeContentRoot`}>
        <section className={styles.heroSection}>
          <Card
            className={`${styles.heroCard} homeHeroCard`}
            padding="none"
            data-hero-group="a"
            aria-labelledby="home-hero-heading"
          >
            <div
              className={`${styles.heroIcon} homeHeroIcon`}
              aria-hidden="true"
            >
              <Hash
                strokeWidth={0.5}
                className={`${styles.heroIconGlyph} homeHeroIconGlyph`}
              />
            </div>

            <div className={`${styles.heroContent} homeHeroContent`}>
              <h1
                id="home-hero-heading"
                className={`${styles.heroTitle} homeHeadline`}
              >
                גלו את <span className={styles.heroTitleAccent}>קוד העושר</span>{' '}
                שלכם
              </h1>
              <p className={`${styles.heroSubtitle} homeSubtitle`}>
                תדר נומרולוגי אישי שמגלה את הדרך הטבעית שלך למגנט שפע, הצלחה
                ומימוש עצמי
              </p>
            </div>

            <Button
              variant="cta"
              className={`${styles.heroCta} btn-primary homeCta`}
              onClick={() => router.push(routes.calculator)}
            >
              מחשבון קוד העושר
            </Button>
          </Card>
        </section>

        <section
          className={`${styles.shareSection} homeShareSection`}
          aria-labelledby="homepage-share-heading"
        >
          <Card className={`${styles.shareCard} homeShareCard`} padding="none">
            <div className={`${styles.shareContent} homeShareContent`}>
              <div className={`${styles.shareCopy} homeShareCopy`}>
                <p className={`${styles.shareSubtitle} homeShareSubtitle`}>
                  שלחו לחברים ולמשפחה הזמנה לגלות את עצמם בלחיצה אחת
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              className={`${styles.shareButton} btn-secondary homeShareButton`}
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

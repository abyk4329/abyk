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
    <main className={`hero-shell ${styles.page}`}>
      <div className={styles.homeContent}>
        <section className={styles.heroSection}>
          <Card
            className={styles.heroCard}
            padding="none"
            data-hero-group="a"
            aria-labelledby="home-hero-heading"
          >
            <div className={styles.heroIcon} aria-hidden="true">
              <Hash strokeWidth={0.5} className={styles.heroIconGlyph} />
            </div>

            <div className={styles.heroContent}>
              <h1 id="home-hero-heading" className={styles.heroTitle}>
                גלו את <span className={styles.heroTitleAccent}>קוד העושר</span>{' '}
                שלכם
              </h1>
              <p className={styles.heroSubtitle}>
                תדר נומרולוגי אישי שמגלה את הדרך הטבעית שלך למגנט שפע, הצלחה
                ומימוש עצמי
              </p>
            </div>

            <Button
              variant="cta"
              className={styles.heroCta}
              onClick={() => router.push(routes.calculator)}
            >
              מחשבון קוד העושר
            </Button>
          </Card>
        </section>

        <section
          className={styles.shareSection}
          aria-labelledby="homepage-share-heading"
        >
          <Card className={styles.shareCard} padding="none">
            <div className={styles.shareContent}>
              <div className={styles.shareCopy}>
                <p className={styles.shareSubtitle}>
                  שלחו לחברים ולמשפחה הזמנה לגלות את עצמם בלחיצה אחת
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              className={styles.shareButton}
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

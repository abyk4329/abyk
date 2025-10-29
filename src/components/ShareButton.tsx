import { useEffect, useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function ShareButton({
  title = 'Awakening by Ksenia',
  text = 'גלה את קוד העושר האישי',
  url,
}: ShareButtonProps) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: url || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          `${text} ${shareData.url}`
        )}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="btn btn-primary ButtonSecondaryText"
      aria-label="שתפו עם מי שחשוב לכם"
      type="button"
    >
      שתפו עם מי שחשוב לכם
    </button>
  );
}

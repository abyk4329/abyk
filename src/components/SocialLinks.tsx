import { FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function SocialLinks() {
  const links = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/awakening.by.ksenia/',
      icon: FaInstagram,
      label: '@awakening.by.ksenia',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@awakening.by.ksenia',
      icon: FaTiktok,
      label: '@awakening.by.ksenia',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/972524616121',
      icon: FaWhatsapp,
      label: '052-461-6121',
    },
    {
      name: 'Email',
      url: 'mailto:awakening.by.ksenia@gmail.com',
      icon: FaEnvelope,
      label: 'awakening.by.ksenia@gmail.com',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 neu-raised-min rounded-md px-4 py-2 hover:shadow-neu-inset transition-shadow"
            aria-label={link.name}
          >
            <Icon className="text-xl" />
            <span className="text-sm">{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}

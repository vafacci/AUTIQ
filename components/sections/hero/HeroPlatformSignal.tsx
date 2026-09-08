import { cn } from "@/lib/cn";
import { heroPlatformOutputs } from "@/data/platforms";
import { useLocale } from "@/components/providers/locale-provider";

type HeroPlatformSignalProps = {
  className?: string;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.5 3c.4 2.4 1.9 4.1 4.5 4.4v2.7c-1.6.1-3-.4-4.5-1.3v5.7c0 3.5-2.5 6-6.2 6-3.2 0-5.8-2.2-6.2-5.3-.1-.6 0-1.1.1-1.6.7-2.8 3.3-4.7 6.1-4.5v2.9c-.2 0-.5-.1-.7 0-1.3.3-2.2 1.5-2.1 2.9.1 1.5 1.4 2.6 2.9 2.6 1.7 0 3-1.3 3-3V3h2.9z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
} as const;

/**
 * Basic monochrome platform icons for the hero.
 */
export function HeroPlatformSignal({ className }: HeroPlatformSignalProps) {
  const { t } = useLocale();

  return (
    <ul
      className={cn("flex items-center gap-4", className)}
      aria-label={t.hero.platformsLabel}
    >
      {heroPlatformOutputs.map((platform) => {
        const Icon = ICONS[platform.id];
        return (
          <li key={platform.id}>
            <span className="sr-only">{platform.label}</span>
            <Icon className="size-[18px] text-text-secondary transition-colors hover:text-text-primary" />
          </li>
        );
      })}
    </ul>
  );
}

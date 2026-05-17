import Image from "next/image";

type Props = {
  seed: string;
  size?: number;
  className?: string;
};

/**
 * Fallback mark for projects without a real logo. Pulls a deterministic
 * monochrome identicon from DiceBear (no API key, no rate limit headache).
 * The vermillion color tracks --color-accent in the light theme; we keep it
 * the same in dark mode and let the desaturate-on-hover behaviour handle
 * the visual rhythm.
 */
export const Identicon = ({ seed, size = 48, className }: Props) => {
  const url =
    `https://api.dicebear.com/9.x/identicon/svg` +
    `?seed=${encodeURIComponent(seed)}` +
    `&backgroundColor=transparent` +
    `&rowColor=e04e2a` +
    `&size=${size * 2}` +
    `&radius=0`;

  return (
    <Image
      src={url}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={"block h-full w-full object-contain " + (className ?? "")}
    />
  );
};

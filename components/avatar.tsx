import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
};

/**
 * In-page version of the same SVG that powers the favicon. Rendered through
 * next/image with `unoptimized` so the SVG passes through untouched. No
 * border, no shadow — the line-art identity is enough.
 */
export const Avatar = ({ size = 36, className }: Props) => (
  <Image
    src="/avatar.jpeg"
    alt="Solomon Adzape"
    width={size * 2}
    height={size * 2}
    priority
    className={"rounded-full object-cover " + (className ?? "")}
    style={{ width: size, height: size }}
  />
);

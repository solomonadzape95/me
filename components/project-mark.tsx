import Image from "next/image";

import { Identicon } from "./identicon";

type Props = {
  name: string;
  slug?: string;
  logo?: string;
  size?: number;
  colorful?: boolean;
  className?: string;
};

/**
 * The visual mark for a project — a real logo if one exists, otherwise a
 * monochrome DiceBear identicon. By default the mark renders desaturated
 * and partially transparent; the closest `.group` ancestor restores
 * saturation on hover/focus. `colorful` skips the desaturate filter — used
 * on the project detail page where there's no row-hover concept.
 */
export const ProjectMark = ({
  name,
  slug,
  logo,
  size = 40,
  colorful = false,
  className,
}: Props) => {
  const seed = slug ?? name;
  const inner = logo ? (
    <Image
      src={logo}
      alt=""
      width={size}
      height={size}
      className="block h-full w-full object-contain"
      unoptimized={logo.endsWith(".svg")}
    />
  ) : (
    <Identicon seed={seed} size={size} />
  );
  const filterClasses = colorful
    ? "opacity-100"
    : "grayscale opacity-70 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100";

  return (
    <span
      style={{ width: size, height: size }}
      className={
        "inline-flex shrink-0 items-center justify-center " +
        filterClasses +
        " " +
        (className ?? "")
      }
    >
      {inner}
    </span>
  );
};

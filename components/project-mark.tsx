import { Fingerprint, PenNib, Stack } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

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
  const inner = seed === "echo" ? (
    <Fingerprint
      size={Math.round(size * 0.9)}
      weight="duotone"
      color="#46d7d0"
      aria-hidden="true"
    />
  ) : seed === "jotter" ? (
    <PenNib
      size={Math.round(size * 0.82)}
      weight="duotone"
      color="#ef9368"
      aria-hidden="true"
    />
  ) : seed === "rizzlr" && logo ? (
    <span className="relative block h-full w-full overflow-hidden rounded-full bg-[#efd0aa]">
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className="block h-full w-full object-contain"
        unoptimized
      />
    </span>
  ) : logo ? (
    <Image
      src={logo}
      alt=""
      width={size}
      height={size}
      className="block h-full w-full object-contain"
      unoptimized={logo.endsWith(".svg")}
    />
  ) : (
    <Stack
      size={Math.round(size * 0.82)}
      weight="duotone"
      color={seed === "flipit" ? "#5fc8ff" : seed === "lisk" ? "#55d99b" : "#d9b36c"}
      aria-hidden="true"
    />
  );
  const filterClasses = colorful
    ? "opacity-100"
    : "grayscale opacity-70 max-lg:grayscale-0 max-lg:opacity-100 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100";

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

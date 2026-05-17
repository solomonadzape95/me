"use client";

/**
 * Renders the display name with the staggered hue-cascade on first paint
 * AND a letter-by-letter nickname reveal on hover/focus. The shared
 * lowercase prefix between `text` and `nickname` stays in place and
 * tints to --color-accent; the rest of the original name cascades up and
 * out, while the rest of the nickname cascades up and into the same line.
 * Reduced motion swaps state instantly. SR-text exposes both forms.
 */
type Props = {
  text: string;
  nickname?: string;
  className?: string;
};

const sharedPrefixLength = (a: string, b: string) => {
  let i = 0;
  const a2 = a.toLowerCase();
  const b2 = b.toLowerCase();
  while (i < a2.length && i < b2.length && a2[i] === b2[i]) i++;
  return i;
};

const isSpace = (c: string) => c === " " || c === " ";

const renderChars = (
  text: string,
  className: string,
  indexStart = 0,
) =>
  Array.from(text).map((c, i) => (
    <span
      key={i}
      className={className}
      style={{ "--i": indexStart + i } as React.CSSProperties}
      data-cn-space={isSpace(c) ? "true" : undefined}
      aria-hidden="true"
    >
      {isSpace(c) ? " " : c}
    </span>
  ));

export const CascadeName = ({ text, nickname, className }: Props) => {
  if (!nickname) {
    return (
      <span className={className}>
        {renderChars(text, "cn-char")}
        <span className="sr-only">{text}</span>
      </span>
    );
  }

  const shared = text.slice(0, sharedPrefixLength(text, nickname));
  const textTail = text.slice(shared.length);
  const nickTail = nickname.slice(shared.length);

  return (
    <span
      className={`cascade-name group/cn relative inline-block cursor-default ${className ?? ""}`}
      tabIndex={0}
      aria-label={`${text} — also known as ${nickname}`}
    >
      {renderChars(shared, "cn-prefix")}
      <span className="cn-stack relative inline-block align-baseline">
        <span className="cn-tail-out inline-block">
          {renderChars(textTail, "cn-out-char", shared.length)}
        </span>
        <span className="cn-tail-in absolute left-0 top-0 whitespace-nowrap">
          {renderChars(nickTail, "cn-in-char", shared.length)}
        </span>
      </span>
      <span className="sr-only">
        {text} (also known as {nickname})
      </span>
    </span>
  );
};

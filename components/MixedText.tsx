import React from "react";

export interface MixedSegment {
  text: string;
  accent?: boolean;
}

interface MixedTextProps {
  segments: MixedSegment[];
  className?: string;
  accentClassName?: string;
  as?: React.ElementType;
  /** Each segment renders as display:block — for multi-line H1 phrase-level pairing */
  block?: boolean;
}

/**
 * Font-pairing component for the Space Mono / Bitcount Prop Single system.
 *
 * Letter-level (nav wordmark, short all-caps callouts):
 *   <MixedText segments={[{ text:"J" },{ text:"M", accent:true }]} />
 *
 * Phrase-level (hero subtext, pull quotes, taglines — mixed case):
 *   <MixedText segments={[
 *     { text:"Fast interfaces," },
 *     { text:" built to last.", accent:true },
 *   ]} />
 */
export function MixedText({
  segments,
  className = "",
  accentClassName = "font-accent font-bold",
  as: Tag = "span",
  block = false,
}: MixedTextProps) {
  return (
    <Tag className={className}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={[
            seg.accent ? accentClassName : undefined,
            block ? "block" : undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined}
        >
          {seg.text}
        </span>
      ))}
    </Tag>
  );
}

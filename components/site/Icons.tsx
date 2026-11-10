import type { SVGProps } from "react";
import type { IconName } from "@/lib/content";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WhatsAppIcon(props: P) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function ArrowDownIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.2 4L19 7" />
    </svg>
  );
}

export function PlusIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function PhoneIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3ZM11 18h2" />
    </svg>
  );
}

/** Lijniconen voor voordelen en diensten — bewust eenvoudig en consistent (1.5px). */
export function FeatureIcon({ name, ...props }: P & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    presence: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2.5" />
        <path d="M3 8h18M7 12h6M7 15h3" />
        <path d="m16.5 12.5 1 1 2-2.5" />
      </>
    ),
    trust: (
      <>
        <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
    mobile: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10.5 18.5h3" />
      </>
    ),
    conversion: (
      <>
        <path d="M4 19h16" />
        <path d="M6 15.5 10 11l3 3 5.5-6.5" />
        <path d="M15 7.5h3.5V11" />
      </>
    ),
    website: (
      <>
        <rect x="2.5" y="4" width="19" height="15" rx="2.5" />
        <path d="M2.5 8.5h19" />
        <circle cx="5.5" cy="6.25" r=".5" fill="currentColor" />
        <circle cx="7.5" cy="6.25" r=".5" fill="currentColor" />
        <path d="M6 12.5h6M6 15.5h4M15 12h3v4h-3z" />
      </>
    ),
    redesign: (
      <>
        <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
        <path d="M20 4v4.5h-4.5" />
        <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
        <path d="M4 20v-4.5h4.5" />
      </>
    ),
    responsive: (
      <>
        <rect x="2.5" y="5" width="13" height="10" rx="1.8" />
        <path d="M6 18.5h6" />
        <rect x="16.5" y="9" width="5" height="10.5" rx="1.4" />
      </>
    ),
    seo: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 5.5 5.5" />
        <path d="M8 11.5 10 9.5l1.5 1.5L13.5 9" />
      </>
    ),
    support: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.3-.6-.6-2.3 2.6-2.6Z" />
      </>
    ),
    automation: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <rect x="15.5" y="3.5" width="5" height="5" rx="1.2" />
        <path d="M8.5 6h7M18 8.5v7M6 8.5V14a4 4 0 0 0 4 4h5.5" />
      </>
    ),
  };
  return (
    <svg {...base} {...props}>
      {paths[name]}
    </svg>
  );
}

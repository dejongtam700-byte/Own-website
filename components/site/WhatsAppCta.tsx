import { whatsappLink, whatsappMessages } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";
import { Magnetic } from "./Magnetic";

type Props = {
  label: string;
  message?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  /** Volle breedte op mobiel, automatische breedte vanaf sm. */
  fullOnMobile?: boolean;
};

/** Primaire conversieknop: opent WhatsApp met een vooraf ingevuld bericht. */
export function WhatsAppCta({ label, message = whatsappMessages.default, variant = "primary", size = "md", className = "", fullOnMobile = false }: Props) {
  const sizing = size === "lg" ? "min-h-[3.75rem] px-7 text-[1.0625rem] sm:min-h-[4.25rem] sm:px-9 sm:text-[1.125rem]" : "";
  return (
    <Magnetic className={fullOnMobile ? "w-full sm:w-auto" : ""}>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${sizing} ${fullOnMobile ? "w-full sm:w-auto" : ""} ${className}`}
      >
        <span>{label}</span>
        <span className="btn-icon">
          <WhatsAppIcon width={16} height={16} />
        </span>
        <span className="sr-only">(opent WhatsApp)</span>
      </a>
    </Magnetic>
  );
}

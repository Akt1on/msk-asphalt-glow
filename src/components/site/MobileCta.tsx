import { useCms } from "@/store/cms";
import { Phone, MessageCircle } from "lucide-react";
import { maxLink, telLink } from "@/lib/contacts";

export function MobileCta() {
  const c = useCms((s) => s.contacts);
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-md p-3 pointer-events-auto">
        <div className="glass rounded-full shadow-soft p-2 flex items-center gap-2">
          <a
            href={telLink(c.phone)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-white py-3 font-semibold"
          >
            <Phone className="size-4" /> Позвонить
          </a>
          <a
            href={maxLink(c.phone)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-foreground py-3 font-semibold border border-border"
          >
            <MessageCircle className="size-4 text-primary" /> MAX
          </a>
        </div>
      </div>
    </div>
  );
}

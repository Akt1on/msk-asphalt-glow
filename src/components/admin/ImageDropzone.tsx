import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export function ImageDropzone({
  value,
  onChange,
}: {
  value?: string;
  onChange: (url: string) => void;
}) {
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Это не изображение");
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error("Файл больше 8 МБ");
        return;
      }
      try {
        setLoading(true);
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const safeExt = /^(jpg|jpeg|png|webp|gif|avif)$/.test(ext) ? ext : "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
        const { error } = await supabase.storage
          .from("cms-images")
          .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
        if (error) throw error;
        const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
        onChange(data.publicUrl);
        toast.success("Изображение загружено");
      } catch (e) {
        console.error(e);
        toast.error("Не удалось загрузить. Войдите как админ.");
      } finally {
        setLoading(false);
      }
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all ${
          drag ? "border-primary bg-primary/5" : "border-border bg-secondary/50"
        } overflow-hidden`}
      >
        {value ? (
          <div className="relative aspect-video">
            <img src={value} alt="" className="size-full object-cover" loading="lazy" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute top-2 right-2 size-8 rounded-full bg-black/70 text-white grid place-items-center"
              aria-label="Убрать"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="aspect-video grid place-items-center text-center p-6">
            <div>
              <div className="mx-auto size-12 rounded-2xl bg-gradient-brand grid place-items-center text-white">
                <Upload className="size-5" />
              </div>
              <div className="mt-3 font-semibold">
                {loading ? "Загрузка..." : "Перетащите фото или нажмите"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                JPG / PNG / WEBP — до 8 МБ. Хранится в облаке.
              </div>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.currentTarget.value = "";
          }}
        />
      </div>
    </div>
  );
}

import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { fileToCompressedBase64 } from "@/lib/image";
import { toast } from "sonner";

export function ImageDropzone({
  value,
  onChange,
}: {
  value?: string;
  onChange: (data: string) => void;
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
      try {
        setLoading(true);
        const b64 = await fileToCompressedBase64(file);
        onChange(b64);
        toast.success("Изображение загружено");
      } catch {
        toast.error("Не удалось обработать изображение");
      } finally {
        setLoading(false);
      }
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
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
            <img src={value} alt="" className="size-full object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute top-2 right-2 size-8 rounded-full bg-black/70 text-white grid place-items-center"
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
                {loading ? "Обработка..." : "Перетащите фото или нажмите"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                JPG / PNG / WEBP — сжатие и сохранение автоматически
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

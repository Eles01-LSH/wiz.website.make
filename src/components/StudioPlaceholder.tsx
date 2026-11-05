import Image from "next/image";
import { CameraIcon } from "@/components/icons";

type StudioPlaceholderProps = {
  src?: string | null;
  alt: string;
  className?: string;
  /** 플레이스홀더 상태일 때 아이콘 아래 표시할 안내 문구. */
  label?: string;
};

/**
 * 실제 스튜디오 사진이 준비되기 전까지 쓰는 자리표시자.
 * src가 들어오면 바로 실제 이미지로 전환된다 — data/studio.ts의 image 필드만 채우면 됨.
 */
export default function StudioPlaceholder({
  src,
  alt,
  className = "",
  label = "STUDIO PHOTO COMING SOON",
}: StudioPlaceholderProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,var(--color-mist),var(--color-mist)_12px,var(--color-paper)_12px,var(--color-paper)_24px)] ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-muted">
        <CameraIcon className="h-6 w-6" />
      </span>
      <span className="px-4 text-center text-[11px] font-bold tracking-[0.15em] text-muted">
        {label}
      </span>
    </div>
  );
}

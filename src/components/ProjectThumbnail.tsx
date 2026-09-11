"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectThumbnail({
  youtubeId,
  alt,
}: {
  youtubeId: string;
  alt: string;
}) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setSrc(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`)}
    />
  );
}

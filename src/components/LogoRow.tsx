import Image from "next/image";
import type { Client } from "@/data/clients";

type LogoRowProps = {
  clients: Client[];
  reverse?: boolean;
  duration?: number;
};

export default function LogoRow({ clients, reverse = false, duration = 42 }: LogoRowProps) {
  const track = [...clients, ...clients];

  return (
    <div className="logo-row overflow-hidden">
      <div
        className={`logo-track flex w-max items-center ${reverse ? "logo-track-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {track.map((client, i) => (
          <div
            key={`${client.file}-${i}`}
            className="flex shrink-0 items-center px-[30px] md:px-[45px]"
          >
            <Image
              src={`/logos/${client.file}.png`}
              alt={client.name}
              width={140}
              height={56}
              className="client-logo h-9 w-auto object-contain md:h-11"
              style={{ "--logo-scale": client.scale } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import LogoRow from "@/components/LogoRow";
import type { Client } from "@/data/clients";

type ClientLogoWallProps = {
  clients: Client[];
};

export default function ClientLogoWall({ clients }: ClientLogoWallProps) {
  const mid = Math.ceil(clients.length / 2);
  const rowOne = clients.slice(0, mid);
  const rowTwo = clients.slice(mid);

  return (
    <div className="logo-wall-mask flex flex-col gap-8 md:gap-10">
      <LogoRow clients={rowOne} duration={42} />
      <LogoRow clients={rowTwo} duration={38} reverse />
    </div>
  );
}

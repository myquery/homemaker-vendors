import darkLogo from "@/assets/logos/homemaker_logo.svg";
import logo from "@/assets/logos/homemaker_logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={150}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={150}
      />
    </div>
  );
}

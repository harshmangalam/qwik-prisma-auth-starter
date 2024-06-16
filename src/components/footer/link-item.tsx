import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { buttonVariants } from "~/components/ui/button/button";
import { cn } from "@qwik-ui/utils";

export const LinkItem = component$(({ href }: { href: string }) => {
  return (
    <li>
      <Link
        class={cn(buttonVariants({ look: "link" }), "text-sm opacity-60")}
        href={href}
      >
        <Slot />
      </Link>
    </li>
  );
});

import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { buttonVariants } from "~/components/ui/button/button";
import { cn } from "@qwik-ui/utils";

export const LinkItem = component$(({ href }: { href: string }) => {
  return (
    <li>
      <Link
        class={cn(
          buttonVariants({ look: "link" }),
          "m-0 h-0 p-0 text-xs opacity-60",
        )}
        href={href}
      >
        <Slot />
      </Link>
    </li>
  );
});

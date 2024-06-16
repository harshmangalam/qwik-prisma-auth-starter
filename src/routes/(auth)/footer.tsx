import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";

export const ListItemLink = component$(({ href }: { href: string }) => {
  return (
    <li>
      <Button>
        <Link class="text-xs opacity-60" href={href}>
          <Slot />
        </Link>
      </Button>
    </li>
  );
});
export const Footer = component$(() => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="py-4">
      <ul class="flex flex-wrap items-center justify-center gap-x-3">
        <li class="text-xs font-medium opacity-60">&copy; {currentYear}</li>
        <ListItemLink href="/">Terms & Conditions</ListItemLink>
        <ListItemLink href="/">Privacy Policy</ListItemLink>
        <ListItemLink href="/">Cookies Policy</ListItemLink>
        <ListItemLink href="/">Report a problem</ListItemLink>
      </ul>
    </footer>
  );
});

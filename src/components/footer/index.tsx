import { component$ } from "@builder.io/qwik";
import { LinkItem } from "./link-item";

export const Footer = component$(() => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="py-4">
      <ul class="flex flex-wrap items-center justify-center gap-x-3">
        <li class="text-xs font-medium opacity-60">&copy; {currentYear}</li>
        <LinkItem href="/">Terms & Conditions</LinkItem>
        <LinkItem href="/">Privacy Policy</LinkItem>
        <LinkItem href="/">Cookies Policy</LinkItem>
        <LinkItem href="/">Report a problem</LinkItem>
      </ul>
    </footer>
  );
});

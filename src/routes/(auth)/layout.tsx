import { Slot, component$ } from "@builder.io/qwik";
import { Footer } from "~/components/footer";

export default component$(() => {
  return (
    <div class="flex h-full min-h-screen flex-col justify-between bg-muted">
      <div class="grid w-screen flex-1 place-items-center">
        <Slot />
      </div>
      <Footer />
    </div>
  );
});

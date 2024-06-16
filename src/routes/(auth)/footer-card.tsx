import { Slot, component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";

export const FooterCard = component$(() => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Description class="text-center text-foreground">
          <Slot />
        </Card.Description>
      </Card.Header>
    </Card.Root>
  );
});

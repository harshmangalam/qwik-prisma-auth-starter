import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";

export default component$(() => {
  return (
    <Card.Root class="w-full max-w-sm">
      <Card.Header class="text-center">
        <Card.Title class="text-2xl">Sign Up</Card.Title>
        <Card.Description class="text-lg leading-6">
          Sign up to create new account and connect with peoples.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form class="flex flex-col gap-4">
          <div class="grid items-center gap-1.5">
            <Label for="name">Name</Label>
            <Input type="name" id="name" placeholder="Name" />
          </div>
          <div class="grid items-center gap-1.5">
            <Label for="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div class="grid items-center gap-1.5">
            <Label for="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button class="w-full">Sign up</Button>
        </Form>
      </Card.Content>
    </Card.Root>
  );
});

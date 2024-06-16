import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { FooterCard } from "../footer-card";
import { prisma } from "~/util/prisma";
import { hashPassord } from "~/util/password";

export const useSignup = routeAction$(
  async ({ email, password, name }, { fail }) => {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await hashPassord(password),
        },
      });
      return;
    } catch (error: any) {
      if (error.code === "P2002") {
        return fail(409, {
          error: "Email address is already in use",
        });
      }
      console.log(error);
      return error;
    }
  },
  zod$({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  }),
);
export default component$(() => {
  const signup = useSignup();
  return (
    <div class="flex flex-col gap-2">
      <Card.Root class="w-full max-w-sm">
        <Card.Header class="text-center">
          <Card.Title class="text-2xl">Sign Up</Card.Title>
          <Card.Description class="text-lg leading-6">
            Sign up to create new account and connect with peoples.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Form action={signup} class="flex flex-col gap-4">
            <div class="grid items-center gap-1.5">
              <Label for="name">Name</Label>
              <Input
                error={signup.value?.fieldErrors?.name}
                type="name"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div class="grid items-center gap-1.5">
              <Label for="email">Email</Label>
              <Input
                error={signup.value?.fieldErrors?.email}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="grid items-center gap-1.5">
              <Label for="password">Password</Label>
              <Input
                error={signup.value?.fieldErrors?.password}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <Button disabled={signup.isRunning} class="w-full">
              Sign up
            </Button>
          </Form>
        </Card.Content>
      </Card.Root>
      <FooterCard>
        Have an account?{" "}
        <Link href="/login" class="font-semibold text-primary">
          Login
        </Link>
      </FooterCard>
    </div>
  );
});

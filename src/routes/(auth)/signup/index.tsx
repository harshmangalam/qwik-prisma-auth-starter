import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { FooterCard } from "../footer-card";
import { prisma } from "~/util/prisma";
import { hashPassord } from "~/util/password";
import { Alert } from "~/components/ui/alert/alert";
import { HiExclamationCircleOutline } from "@qwikest/icons/heroicons";
export const useSignup = routeAction$(
  async ({ email, password, name }, { fail, redirect, error }) => {
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: await hashPassord(password),
        },
      });
      throw redirect(302, "/login");
    } catch (err: any) {
      if (err.code === "P2002") {
        return fail(409, {
          error: "Email address is already in use",
        });
      }
      throw error(500, "Internal Server Error");
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
          {signup.value?.error && (
            <Alert.Root look={"alert"}>
              <HiExclamationCircleOutline class="h-6 w-6" />
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{signup.value.error}</Alert.Description>
            </Alert.Root>
          )}
          <Form action={signup} class="mt-4 flex flex-col gap-4">
            <div class="grid items-center gap-1.5">
              <Label for="name">Name</Label>
              <Input
                error={signup.value?.fieldErrors?.name?.[0]}
                type="name"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            <div class="grid items-center gap-1.5">
              <Label for="email">Email</Label>
              <Input
                error={signup.value?.fieldErrors?.email?.[0]}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="grid items-center gap-1.5">
              <Label for="password">Password</Label>
              <Input
                error={signup.value?.fieldErrors?.password?.[0]}
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

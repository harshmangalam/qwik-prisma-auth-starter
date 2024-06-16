import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { FooterCard } from "../footer-card";
import { prisma } from "~/util/prisma";
import { comparePassword } from "~/util/password";
import { Alert } from "~/components/ui/alert/alert";
export const useLogin = routeAction$(
  async ({ email, password }, { fail, redirect, error }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user?.email !== email) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      const matchPassword = await comparePassword(password, user.password);

      if (!matchPassword) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }

      throw redirect(302, "/");
    } catch (err: any) {
      if (err.message) {
        console.log(err);
        throw error(500, "Internal server error");
      }
      throw err;
    }
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
  }),
);
export default component$(() => {
  const login = useLogin();
  return (
    <div class="flex w-full max-w-sm flex-col gap-2">
      <Card.Root class="w-full max-w-md">
        <Card.Header class="text-center">
          <Card.Title class="text-2xl">Log in</Card.Title>
        </Card.Header>
        <Card.Content>
          {login.value?.error && (
            <Alert.Root look={"alert"}>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{login.value.error}</Alert.Description>
            </Alert.Root>
          )}
          <Form action={login} class="mt-4 flex flex-col gap-4">
            <div class="grid items-center gap-1.5">
              <Label for="email">Email</Label>
              <Input
                error={login.value?.fieldErrors?.email?.[0]}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="grid items-center gap-1.5">
              <Label for="password">Password</Label>
              <Input
                error={login.value?.fieldErrors?.password?.[0]}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <Button disabled={login.isRunning} class="w-full">
              Log in
            </Button>
          </Form>
        </Card.Content>
      </Card.Root>
      <FooterCard>
        Don't have an account?{" "}
        <Link href="/signup" class="font-semibold text-primary">
          Sign up
        </Link>
      </FooterCard>
    </div>
  );
});

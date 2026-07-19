import Link from "next/link";
import { LinkButton } from "@/components/shared/link-button";

export default function NotFound() {
  return (
    <div className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-navy dark:text-white">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" className="rounded-full bg-navy text-white dark:bg-electric dark:text-navy">
          Back home
        </LinkButton>
        <LinkButton href="/contact" variant="outline" className="rounded-full">
          Contact us
        </LinkButton>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Or browse{" "}
        <Link href="/products" className="text-electric hover:underline">
          products
        </Link>
        .
      </p>
    </div>
  );
}

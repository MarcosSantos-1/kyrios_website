"use server";

import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Server actions chamadas pelo cliente admin após mutações no Firestore.
 * Não fazem write — só invalidam o cache do Next.js pra que as páginas
 * públicas peguem os dados novos no próximo request.
 */

export async function revalidateProducts() {
  revalidateTag("products");
  revalidatePath("/");
  revalidatePath("/produtos");
}

export async function revalidateTestimonials() {
  revalidateTag("testimonials");
  revalidatePath("/");
}

export async function revalidateSiteConfig() {
  revalidateTag("site-config");
  revalidatePath("/");
  revalidatePath("/produtos");
}

export async function revalidateAll() {
  revalidateTag("products");
  revalidateTag("testimonials");
  revalidateTag("site-config");
  revalidatePath("/", "layout");
}

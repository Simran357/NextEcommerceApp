"use client";

import CheckoutClient from "@/components/cart/checkout";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
'use client';

import { registerLicense } from "@syncfusion/ej2-base";

const LICENSE_KEY =
  process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY ||
  process.env.NEXT_PUBLIC_LICENSE_KEY ||
  process.env.syncfusion_license_key ||
  process.env.LICENSE_KEY;

if (LICENSE_KEY) {
  registerLicense(LICENSE_KEY.trim());
} else {
  console.warn("[Syncfusion License] No license key found in environment variables.");
}


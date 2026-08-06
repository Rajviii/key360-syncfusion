'use client';

import { registerLicense } from "@syncfusion/ej2-base";

const LICENSE_KEY = process.env.syncfusion_license_key;

registerLicense(LICENSE_KEY as string);

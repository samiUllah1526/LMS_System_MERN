import { Button, Html } from "@react-email/components";
import * as React from "react";

export function Email({ name }: { name: string }) {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        { name }
      </Button>
    </Html>
  );
}

export default Email
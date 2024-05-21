import { redirect } from "next/navigation";

import { createClient } from "src/common/lib/supabase/server";
import { Button } from "src/components/Button";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      Hello {data.user?.email}
      <Button>Click me</Button>
    </div>
  );
}

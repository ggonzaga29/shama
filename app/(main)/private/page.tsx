import { redirect } from "next/navigation";

import { createClient } from "src/common/utils/supabase/server";
import { Button } from "src/components/Button";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      Hello {data.user.email}
      <Button>Click me</Button>
    </div>
  );
}

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}

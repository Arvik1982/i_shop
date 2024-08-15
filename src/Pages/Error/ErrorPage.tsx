type TProps = { errorProp?: string | number | undefined };

export default function ErrorPage({
  errorProp = "404 PAGE NOT FOUND",
}: TProps) {
  return (
    <section style={{ height: "900px" }}>
      <h1 style={{ marginTop: "150px" }}>ERROR: {errorProp}</h1>
    </section>
  );
}

export async function register() {
  const { brand } = await import('@makashif/brand');
  brand();
}

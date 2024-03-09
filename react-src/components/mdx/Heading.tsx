export const Heading = {
  H1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-6xl font-bold">{children}</h1>
  ),
  H2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl font-bold">{children}</h2>
  ),
  H3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold">{children}</h3>
  ),
}

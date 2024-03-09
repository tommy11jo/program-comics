interface LayoutProps {
  children: React.ReactNode
  meta: {
    title: string
    date: string
  }
}
// This is the layout for each post, or mdx file.
// Limitation: Mdx is rendered client side, so `fs` cannot be used to read files in a slideshow folder
export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden my-8">
        <div className="p-6">
          <div className="text-left text-base leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

import { ConfigProvider } from "@/components/ConfigContext"
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
    <ConfigProvider>
      <div className="flex flex-col items-center min-h-screen p-2 lg:p-4">
        <div className="w-full max-w-3xl shadow-lg rounded-lg my-8">
          <div className="lg:p-6">
            <div className="text-left text-base leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

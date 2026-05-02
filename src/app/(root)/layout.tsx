import { Header } from '@/components/header'

export default function PostsLayout({ children }: React.PropsWithChildren) {
  return <>
    <Header />
    {children}
  </>
}

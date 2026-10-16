import { useEffect } from 'react'

export function PageMeta({ title, description, image }: { title: string; description: string; image?: string }) {
  useEffect(() => {
    document.title = title
    const setContent = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
    }
    setContent('meta[name="description"]', description)
    setContent('meta[property="og:title"]', title)
    setContent('meta[property="og:description"]', description)
    setContent('meta[name="twitter:title"]', title)
    setContent('meta[name="twitter:description"]', description)
    const setImage = (selector: string, content: string | undefined) => {
      let meta = document.querySelector<HTMLMetaElement>(selector)
      if (!content) {
        meta?.remove()
        return
      }
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(selector.includes('og:') ? 'property' : 'name', selector.includes('og:') ? 'og:image' : 'twitter:image')
        document.head.append(meta)
      }
      meta.setAttribute('content', new URL(content, window.location.origin).href)
    }
    setImage('meta[property="og:image"]', image)
    setImage('meta[name="twitter:image"]', image)
    setContent('meta[name="twitter:card"]', image ? 'summary_large_image' : 'summary')
  }, [title, description, image])
  return null
}

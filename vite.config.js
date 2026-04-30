import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).length
  return `${Math.ceil(words / 200)} min read`
}

function blogIndexPlugin() {
  return {
    name: 'blog-index',
    buildStart() {
      const postsDir = path.resolve(__dirname, 'public/blog/posts')
      if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
      const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
      const posts = files.map(file => {
        const slug = file.replace(/\.md$/, '')
        const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
        const { data } = matter(raw)
        return {
          slug,
          title: data.title || slug,
          date: data.date || '',
          tags: data.tags || [],
          excerpt: data.excerpt || '',
          readingTime: data.readingTime || estimateReadingTime(raw),
        }
      }).sort((a, b) => new Date(b.date) - new Date(a.date))
      fs.writeFileSync(
        path.resolve(__dirname, 'public/blog/index.json'),
        JSON.stringify(posts, null, 2)
      )
      console.log('[blog-index] Generated index for ' + posts.length + ' post(s)')
    }
  }
}

export default defineConfig({
  plugins: [react(), blogIndexPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
    }
  }
})

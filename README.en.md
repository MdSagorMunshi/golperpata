<div align="center">

# গল্পের.পাতা (Golper Pata)

**Pages of Stories — An Open-Source Bengali Story Library**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://golperpata.vercel.app)

[🌐 Live Site](https://golperpata.vercel.app) · [📖 Read Stories](https://golperpata.vercel.app/golpo) · [✍️ Submit a Story](#-submit-a-story)

*[🇧🇩 বাংলায় পড়ুন](README.md)*

</div>

---

## 🌸 What is this?

Golper Pata (গল্পের.পাতা — "Pages of Stories") is a community-driven, open-source Bengali story library. Anyone can read Bengali stories for free, and contribute new ones by submitting a Pull Request on GitHub.

### Our Principles

- ✅ **Free forever** — No subscriptions, no paywalls
- 🚫 **No ads** — Completely ad-free experience
- 🔒 **No tracking** — No cookies or personal data collection
- 🔓 **No accounts** — Read without registration
- 📖 **Open source** — MIT licensed

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **📚 Story Reader** | Beautiful reading experience with reading mode, font controls, and print support |
| **🔍 Search** | Fuse.js powered search — direct + fuzzy matching |
| **🏷️ Tag System** | Browse by tags, categories, and authors |
| **✍️ Format Converter** | Convert plain text → Golper Pata compatible markdown |
| **📝 Live Editor** | Split-pane markdown editor with live preview |
| **🌙 Dark Mode** | System-aware dark mode with manual toggle |
| **📱 Responsive** | Mobile-first design with reading mode |
| **🖨️ Print Ready** | Clean print stylesheet |
| **📡 RSS Feed** | `/feed.xml` for RSS readers |
| **🗺️ SEO** | Dynamic sitemap, robots.txt, OG meta |
| **🤖 AI Label** | AI-generated stories are automatically marked with a visible badge |

---

## ✍️ Submit a Story

Contributing a new story to Golper Pata is easy!

### Step 1: Prepare your story

Use the [Converter Tool](https://golperpata.vercel.app/rupantar) to format your story automatically.

Or manually create a `.md` file with the following frontmatter:

```yaml
---
শিরোনাম: "Your Story Title"
লেখক: "Author Name"
বিষয়শ্রেণী: "ছোটগল্প"
ট্যাগ:
  - "tag-1"
  - "tag-2"
সংক্ষেপ: "A short description of the story"
কপিরাইট_মুক্ত: true
এআই_নির্মিত: false
---

Your story text goes here...
```

> **Note:** Frontmatter fields are in Bengali. `শিরোনাম` = Title, `লেখক` = Author, `বিষয়শ্রেণী` = Category, `ট্যাগ` = Tags, `সংক্ষেপ` = Summary, `কপিরাইট_মুক্ত` = Copyright-free, `এআই_নির্মিত` = AI-generated.

### Step 2: Place the file

```
golpo/
  └── author-name/
      └── story-title.md
```

### Step 3: Submit a PR

Fork → Create a new branch → Add your story → Open a Pull Request!

> 🎉 Once your PR is merged, the story will be automatically published on the site.

---

## 🛠️ Development

### Prerequisites

- [Node.js 24](https://nodejs.org/)
- [Bun](https://bun.sh/) (recommended) or npm

### Setup

```bash
# Clone
git clone https://github.com/MdSagorMunshi/golperpata.git
cd golperpata

# Install dependencies
bun install

# Copy env file
cp .env.local.example .env.local

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Content | Markdown + gray-matter |
| Search | Fuse.js |
| Analytics | Supabase (optional) |
| Hosting | Vercel |
| Runtime | Bun |

---

## 📁 Project Structure

```
golperpata/
├── golpo/                    # 📖 Story files (GitHub as CMS)
│   └── author-name/
│       └── story.md
├── public/images/            # 🎨 Assets
├── src/
│   ├── app/                  # 📄 Pages (Next.js App Router)
│   ├── components/           # 🧩 UI Components
│   ├── lib/                  # ⚙️ Utilities & story parser
│   └── types/                # 📝 TypeScript types
└── .github/workflows/        # 🤖 CI/CD
```

---

## 📜 License

[MIT](LICENSE) — Free forever.

---

<div align="center">

**Built by [Ryan Shelby](https://github.com/MdSagorMunshi)**

*Bengali literature, open for everyone.*

</div>

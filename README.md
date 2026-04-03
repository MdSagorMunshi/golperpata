<div align="center">

# গল্পের.পাতা

**Pages of Stories — An Open-Source Bengali Story Library**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://golperpata.vercel.app)

[🌐 Live Site](https://golperpata.vercel.app) · [📖 গল্প পড়ুন](https://golperpata.vercel.app/golpo) · [✍️ গল্প জমা দিন](#গল্প-জমা-দিন)

</div>

---

## 🌸 কী এটি?

গল্পের.পাতা হলো একটি সম্প্রদায়চালিত, ওপেন-সোর্স বাংলা গল্প পাঠাগার। যে কেউ বিনামূল্যে
বাংলা গল্প পড়তে পারেন, এবং GitHub-এ Pull Request পাঠিয়ে নতুন গল্প যোগ করতে পারেন।

### নীতিমালা

- ✅ **চিরকাল বিনামূল্যে** — কোনো সাবস্ক্রিপশন নেই
- 🚫 **কোনো বিজ্ঞাপন নেই** — সম্পূর্ণ বিজ্ঞাপনমুক্ত
- 🔒 **কোনো ট্র্যাকিং নেই** — কোনো কুকি বা ব্যক্তিগত তথ্য সংগ্রহ নেই
- 🔓 **কোনো অ্যাকাউন্ট নেই** — নিবন্ধন ছাড়াই পড়ুন
- 📖 **ওপেন সোর্স** — MIT লাইসেন্স

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **📚 Story Reader** | Beautiful reading experience with reading mode, font controls, print support |
| **🔍 Search** | Fuse.js powered search — direct + fuzzy matching |
| **🏷️ Tag System** | Browse by tags, categories, authors |
| **✍️ Format Converter** | Convert plain text → Golper Pata compatible markdown |
| **📝 Live Editor** | Split-pane markdown editor with live preview |
| **🌙 Dark Mode** | System-aware dark mode with manual toggle |
| **📱 Responsive** | Mobile-first design with reading mode |
| **🖨️ Print Ready** | Clean print stylesheet |
| **📡 RSS Feed** | `/feed.xml` for RSS readers |
| **🗺️ SEO** | Dynamic sitemap, robots.txt, OG meta |
| **🤖 AI Label** | AI-generated stories are automatically marked with a visible badge |

---

## 📖 গল্প জমা দিন

গল্পের.পাতায় নতুন গল্প জমা দেওয়া খুবই সহজ!

### ধাপ ১: গল্প তৈরি করুন

[রূপান্তরক](https://golperpata.vercel.app/rupantar) ব্যবহার করে গল্পটি সঠিক ফরম্যাটে রূপান্তর করুন।

অথবা ম্যানুয়ালি একটি `.md` ফাইল তৈরি করুন:

```yaml
---
শিরোনাম: "আপনার গল্পের শিরোনাম"
লেখক: "লেখকের নাম"
বিষয়শ্রেণী: "ছোটগল্প"
ট্যাগ:
  - "ট্যাগ-১"
  - "ট্যাগ-২"
সংক্ষেপ: "গল্পের সংক্ষিপ্ত বিবরণ"
কপিরাইট_মুক্ত: true
এআই_নির্মিত: false
---

গল্পের মূল লেখা এখানে...
```

### ধাপ ২: ফাইল রাখুন

```
golpo/
  └── লেখকের-নাম/
      └── গল্পের-শিরোনাম.md
```

### ধাপ ৩: PR পাঠান

Fork করুন → নতুন branch → গল্প যোগ করুন → Pull Request পাঠান!

> 🎉 PR মার্জ হওয়ার সাথে সাথে গল্পটি স্বয়ংক্রিয়ভাবে সাইটে প্রকাশিত হবে।

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
│   └── লেখকের-নাম/
│       └── গল্প.md
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

**তৈরি করেছেন [Ryan Shelby](https://github.com/MdSagorMunshi)**

*বাংলা সাহিত্য সবার জন্য উন্মুক্ত।*

</div>

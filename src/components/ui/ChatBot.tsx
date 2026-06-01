'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { personalInfo, experiences, projects, skills } from '@/data/portfolio'
import { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

const quickQuestions = [
  '現在の仕事は？',
  'AI駆動開発について',
  '得意な技術は？',
  '代表的なプロジェクトは？',
  '組込み経験は？',
  'GitHubでは何が見られますか？'
]

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, '')

const hasAny = (text: string, keywords: string[]) => {
  const normalized = normalize(text)
  return keywords.some((keyword) => normalized.includes(normalize(keyword)))
}

const list = (items: string[], limit = 6) => {
  const values = items.slice(0, limit)
  return `${values.join('、')}${items.length > limit ? ' など' : ''}`
}

const findProject = (question: string) => {
  const normalized = normalize(question)

  return projects.find((project) => {
    const searchable = [
      project.title,
      project.description,
      project.longDescription,
      ...project.technologies,
      ...(project.features ?? []),
      ...(project.technicalHighlights ?? [])
    ].join(' ')

    const tokens = [
      ...project.title.split(/[\s-]+/),
      ...project.technologies.flatMap((tech) => tech.split(/[\s./-]+/))
    ]
      .map(normalize)
      .filter((token) => token.length >= 3)

    return normalize(searchable).includes(normalized) || tokens.some((token) => normalized.includes(token))
  })
}

const answerQuestion = (question: string) => {
  const current = experiences.find((experience) => experience.current)
  const project = findProject(question)

  if (project) {
    return `${project.title} は、${project.description}です。主な技術は ${list(project.technologies, 5)}。${project.longDescription}`
  }

  if (hasAny(question, ['現在', '現職', '仕事', 'cto', 'robot payment', 'ロボットペイメント'])) {
    return current
      ? `${current.company}で${current.position}を担当しています。${current.description.slice(0, 3).join('。')}。`
      : personalInfo.bio
  }

  if (hasAny(question, ['ai', '生成ai', 'ai駆動', 'dify', 'llm', 'chatgpt', 'claude'])) {
    const aiProjects = projects.filter((item) =>
      item.category === 'ml' || item.technologies.some((tech) => hasAny(tech, ['ai', 'dify']))
    )

    return `AI領域は、機械学習モデル開発そのものより、生成AIやDifyを開発プロセス・業務・プロダクトに組み込む方向が中心です。現職ではAI駆動開発の導入を担当し、公開プロジェクトでは ${list(aiProjects.map((item) => item.title), 4)} があります。`
  }

  if (hasAny(question, ['技術', 'スキル', '得意', 'stack', 'スタック'])) {
    const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 8)
    return `主なスキルは ${list(topSkills.map((skill) => skill.name), 8)} です。軸はAI駆動開発、TypeScript/Next.js/NestJSのWebプロダクト、C#/.NETの決済バックエンド、C/C++の組込み制御です。`
  }

  if (hasAny(question, ['組込み', '組み込み', 'c++', 'linux', '制御', '通信', 'msx', 'ゲーム'])) {
    return '組込み領域では、C/C++、Linux、TCP/IP、UDP、RS232C、CANなどを使った制御・通信系の経験があります。小学校5年生のときにMSXで初めてゲームを作ったことが、プログラミングの原点です。'
  }

  if (hasAny(question, ['プロジェクト', 'github', 'リポジトリ', 'repo', '公開'])) {
    return `公開プロジェクトでは ${list(projects.map((item) => item.title), 6)} を掲載しています。Dify利用量集計、DifyのAWSセルフホスト検証、ポケモンカード価格比較、AI APIを使ったプロトタイプなどがあります。`
  }

  if (hasAny(question, ['マネジメント', 'pm', '管理', '組織', 'チーム', '見積'])) {
    return 'マネジメントでは、東海ソフト時代に課員28〜30名、パートナー20〜30名規模の組織運営を経験しています。PMとして見積もり、チーム編成、顧客折衝、進捗・課題・品質管理も担当してきました。'
  }

  if (hasAny(question, ['連絡', 'contact', 'メール', 'github'])) {
    return `公開連絡先としてGitHubを掲載しています: ${personalInfo.github}`
  }

  return `${personalInfo.name}のプロフィールについて回答できます。現在の仕事、AI駆動開発、得意技術、公開プロジェクト、組込み経験、マネジメント経験などを質問してみてください。`
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      content: `${personalInfo.name}の経歴・スキル・プロジェクトについて質問できます。`,
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (message?: string) => {
    const text = message ?? inputValue.trim()
    if (!text || isTyping) return

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        content: text,
        isUser: true,
        timestamp: new Date()
      }
    ])
    setInputValue('')
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 350))

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        content: answerQuestion(text),
        isUser: false,
        timestamp: new Date()
      }
    ])
    setIsTyping(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="flex items-center space-x-4 p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-t-2xl border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Profile Assistant</h3>
          <p className="text-sm text-gray-400">サイト内の情報から回答します</p>
        </div>

        <Sparkles className="w-5 h-5 text-cyan-400 ml-auto" />
      </motion.div>

      <div className="h-96 overflow-y-auto p-6 bg-black/20 border-x border-white/20 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={cn('flex items-start space-x-3', message.isUser ? 'justify-end' : 'justify-start')}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={cn(
                  'max-w-xs lg:max-w-md px-4 py-3 rounded-2xl',
                  message.isUser
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white ml-auto'
                    : 'bg-white/10 border border-white/20 text-gray-100'
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/5 border-x border-white/20">
        <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question) => (
            <motion.button
              key={question}
              onClick={() => sendMessage(question)}
              disabled={isTyping}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-all border border-white/10 hover:border-white/20 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-b-2xl border border-white/20 border-t-0">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              sendMessage()
            }
          }}
          placeholder="例: Difyのプロジェクトについて教えて"
          className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition-all"
          disabled={isTyping}
        />

        <motion.button
          onClick={() => sendMessage()}
          disabled={!inputValue.trim() || isTyping}
          className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="質問を送信"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

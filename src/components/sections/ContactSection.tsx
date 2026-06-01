'use client'

import { motion } from 'framer-motion'
import { Github, MapPin, Bot, Code2, Users, Workflow } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'

const contactMethods = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@Ardama18',
    href: personalInfo.github,
    color: 'from-gray-600 to-gray-800'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
    color: 'from-red-500 to-pink-500'
  }
]

const focusAreas = [
  {
    icon: Bot,
    title: 'AI駆動開発の導入',
    description: '要件定義、設計、実装、テスト、レビュー、ドキュメント化までAIを組み込む開発プロセスを設計します。'
  },
  {
    icon: Code2,
    title: '新規SaaS / Webプロダクト',
    description: 'Next.js、NestJS、Prisma、PostgreSQL、AWSを使い、仕様駆動でプロダクトを立ち上げます。'
  },
  {
    icon: Workflow,
    title: '既存システム改善',
    description: '決済、業務システム、組込みLinux/C++など、大規模コードベースの仕様把握と安全な改修を進めます。'
  },
  {
    icon: Users,
    title: '技術推進とマネジメント',
    description: '顧客折衝、見積もり、チーム編成、品質管理、勉強会運営まで、現場実装と組織展開をつなぎます。'
  }
]

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Contact
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            公開している活動やコードはGitHubから確認できます。未確認の連絡先は掲載せず、公開情報だけに絞っています。
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-4">Public Profile</h3>
              <p className="text-gray-300 leading-relaxed">
                GitHubでは、AI活用、Dify運用、Webアプリ、データ分析、ポートフォリオなどの公開リポジトリを確認できます。
              </p>
            </motion.div>

            {contactMethods.map((method) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm group-hover:border-white/40 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {method.label}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {focusAreas.map((area) => (
              <motion.div
                key={area.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(34, 211, 238, 0.16)"
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-5">
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{area.title}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

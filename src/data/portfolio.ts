import { Project, Skill, Experience } from '@/types'

export const projects: Project[] = [
  {
    id: 'dify-usage-exporter',
    title: 'Dify Usage Exporter',
    description: 'Difyの利用量を集計し、API_Meterへ連携するTypeScriptバッチツール',
    longDescription: 'Difyの利用量データをモデル別、ユーザー別、アプリ別、ワークスペース単位で集計し、API_Meterへ送信するツールです。送信失敗時のスプール、リトライ、source_event_idによる冪等性、cron形式のスケジュール実行を備え、AI活用の運用コスト可視化を支える実務寄りの仕組みにしています。',
    technologies: ['TypeScript', 'Node.js', 'Dify API', 'API_Meter', 'Docker', 'Cron'],
    imageUrl: '/projects/dify-usage-exporter.jpg',
    githubUrl: 'https://github.com/Ardama18/dify-usage-exporter',
    features: [
      'モデル別、ユーザー別、アプリ別、ワークスペース別の利用量集計',
      '送信失敗時のスプール保持と自動リトライ',
      'source_event_idを使った重複送信防止',
      'cron形式のスケジュール実行'
    ],
    technicalHighlights: [
      'Dify APIとAPI_Meter新仕様をつなぐ正規化層',
      'バッチ処理として扱いやすいTypeScript構成',
      '運用時の再実行を前提にした冪等設計',
      'Dockerでの実行環境標準化'
    ],
    featured: true,
    category: 'api',
    year: 2025,
    status: 'completed'
  },
  {
    id: 'dify-self-hosted-on-aws',
    title: 'Dify Self-hosted on AWS',
    description: 'Dify 1.7.1をAWS上でセルフホストするためのCDK構成',
    longDescription: 'DifyをAWS上でセルフホストするための構成です。AI活用をプロダクトや社内業務に持ち込む際に、クラウド構成、コンテナ、周辺スクリプトを含めて検証し、実運用を見据えたAI基盤の選択肢を整理しています。',
    technologies: ['AWS CDK', 'TypeScript', 'Docker', 'Python', 'Shell', 'Dify'],
    imageUrl: '/projects/dify-self-hosted-on-aws.jpg',
    githubUrl: 'https://github.com/Ardama18/dify-self-hosted-on-aws',
    features: [
      'Dify 1.7.1のAWSセルフホスト検証',
      'CDKによるインフラ構成管理',
      'コンテナ実行を前提にした環境整理',
      'AI基盤の社内利用・プロダクト利用を見据えた検証'
    ],
    technicalHighlights: [
      'TypeScript中心のInfrastructure as Code',
      'AWSとDockerを組み合わせたAI実行基盤',
      '補助スクリプトによる構築手順の自動化',
      'AI推進に必要な基盤技術の実地検証'
    ],
    featured: true,
    category: 'ml',
    year: 2025,
    status: 'completed'
  },
  {
    id: 'pokemon-card-price-tracker',
    title: 'Pokemon Card Price Tracker',
    description: 'ポケモンカードの市場価格と価格推移を比較できるWebアプリ',
    longDescription: 'Pokemon TCG APIなどを利用し、カード検索、詳細情報、高解像度画像、TCGPlayerやCardMarketの価格表示、Chart.jsによる価格推移グラフ、ローカルストレージベースのウォッチリストを備えた価格比較MVPです。日本語UIとレスポンシブ対応を前提に、検索から比較までを一通り体験できる形にしています。',
    technologies: ['TypeScript', 'Next.js', 'React', 'Chart.js', 'Pokemon TCG API', 'CSS'],
    imageUrl: '/projects/pokemon-card-price-tracker.jpg',
    githubUrl: 'https://github.com/Ardama18/pokemon-card-price-tracker',
    features: [
      'カード名・セット名による検索',
      'カード詳細と価格情報の表示',
      '価格推移グラフ',
      'ウォッチリストによるお気に入り管理'
    ],
    technicalHighlights: [
      '外部APIを使ったカード検索と価格表示',
      'Chart.jsによるインタラクティブな時系列表示',
      'ローカルストレージを使った軽量な状態保持',
      'PC・スマートフォン両対応のレスポンシブUI'
    ],
    featured: true,
    category: 'web',
    year: 2025,
    status: 'completed'
  },
  {
    id: 'rphackathon',
    title: 'RPHackathon',
    description: '生成AI APIを使った社内ハッカソン向けPython/Streamlitプロトタイプ',
    longDescription: 'OpenAI、Anthropic、Google APIを切り替えながら検証できるPythonベースのハッカソンプロジェクトです。職務経歴上では、この社内ハッカソン優勝がAI活用や新規価値創出への評価につながり、CTO室でのAI推進ロールへ移るきっかけになっています。',
    technologies: ['Python', 'Streamlit', 'OpenAI API', 'Anthropic API', 'Google API', 'Docker'],
    imageUrl: '/projects/rphackathon.jpg',
    githubUrl: 'https://github.com/Ardama18/RPHackathon',
    features: [
      '複数LLM APIを扱うプロトタイプ構成',
      'Streamlitによる短期間でのUI構築',
      'Dev Containerを含む開発環境整理',
      'ハッカソンでの価値検証'
    ],
    technicalHighlights: [
      'PythonでのAI API連携',
      '環境変数テンプレートによる設定分離',
      'Docker/Dev Containerでの再現性確保',
      '短期間で仮説検証する実装スタイル'
    ],
    featured: true,
    category: 'ml',
    year: 2024,
    status: 'completed'
  },
  {
    id: 'seiki-eq',
    title: 'SEIKI-EQ',
    description: 'マルチファクターアルファ生成と機械学習モデルを扱う定量取引システム',
    longDescription: '公開リポジトリの説明に基づく、マルチファクターのアルファ生成と機械学習モデルを扱うPythonプロジェクトです。金融データ、モデル、バックテスト、リスク管理といった定量分析領域の関心を示す実験的な取り組みです。',
    technologies: ['Python', 'Machine Learning', 'Quant Research', 'Data Analysis'],
    imageUrl: '/projects/seiki-eq.jpg',
    githubUrl: 'https://github.com/Ardama18/SEIKI-EQ',
    features: [
      'マルチファクターのアルファ生成',
      '機械学習モデルを使った分析',
      '定量取引領域の実験',
      'Python中心のデータ処理'
    ],
    technicalHighlights: [
      '金融データを前提にした分析設計',
      'モデル評価を意識した構成',
      'Pythonによるプロトタイピング',
      'AI/MLとドメイン知識の接続'
    ],
    featured: false,
    category: 'ml',
    year: 2025,
    status: 'concept'
  },
  {
    id: 'neo-portfolio',
    title: 'Neo Portfolio',
    description: 'Next.js、Three.js、Framer Motionで構築したポートフォリオサイト',
    longDescription: 'このポートフォリオ自体です。Next.js App Router、React Three Fiber、Framer Motionを使い、3D背景、アニメーション、プロジェクトモーダル、スキル表示、インタラクティブなプロフィール体験を組み合わせています。',
    technologies: ['Next.js', 'TypeScript', 'React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: '/projects/neo-portfolio.jpg',
    githubUrl: 'https://github.com/Ardama18/neo-portfolio',
    features: [
      '3D背景を持つシングルページ構成',
      'プロジェクトのフィルタリングと詳細モーダル',
      'スキルカテゴリ別表示',
      'プロフィール内容に合わせた対話UI'
    ],
    technicalHighlights: [
      'Next.js App Router構成',
      'React Three Fiberによる3D表現',
      'Framer Motionによる遷移とマイクロインタラクション',
      'TypeScriptでの型付きデータ管理'
    ],
    featured: false,
    category: 'web',
    year: 2025,
    status: 'in-progress'
  }
]

export const skills: Skill[] = [
  { name: 'AI駆動開発', category: 'ml', level: 95, years: 2, icon: 'AI' },
  { name: 'TypeScript', category: 'frontend', level: 90, years: 2, icon: 'TS' },
  { name: 'Next.js', category: 'frontend', level: 88, years: 2, icon: 'NX' },
  { name: 'React', category: 'frontend', level: 85, years: 2, icon: 'RE' },
  { name: 'NestJS', category: 'backend', level: 86, years: 1, icon: 'NS' },
  { name: 'Prisma', category: 'backend', level: 84, years: 1, icon: 'PR' },
  { name: 'PostgreSQL', category: 'backend', level: 85, years: 4, icon: 'DB' },
  { name: 'C# / .NET', category: 'backend', level: 92, years: 8, icon: 'C#' },
  { name: 'C++ / Linux', category: 'backend', level: 92, years: 15, icon: 'C++' },
  { name: 'Python', category: 'backend', level: 82, years: 4, icon: 'PY' },
  { name: 'AWS', category: 'devops', level: 78, years: 1, icon: 'AWS' },
  { name: 'Docker', category: 'devops', level: 80, years: 3, icon: 'DK' },
  { name: 'Playwright', category: 'other', level: 82, years: 1, icon: 'PW' },
  { name: 'Vitest / Biome', category: 'other', level: 80, years: 1, icon: 'QA' },
  { name: 'Vue.js / Nuxt.js', category: 'frontend', level: 82, years: 3, icon: 'VU' },
  { name: 'Flutter / Dart', category: 'mobile', level: 74, years: 1, icon: 'FL' }
]

export const experiences: Experience[] = [
  {
    id: 'robot-payment-cto',
    company: '株式会社ROBOT PAYMENT',
    position: 'CTO室 / AI推進・新規プロダクト開発',
    duration: '2025.09 - Present',
    description: [
      '全社のAI活用推進と、開発組織へのAI駆動開発導入を担当',
      '債権回収領域の新規SaaSで仕様駆動の開発フロー、設計ドキュメント、品質チェックを整備',
      'Next.js / NestJS / Prisma / PostgreSQLを中心に、BFF、認証、業務API、バッチ、SQSハンドラー、E2Eテストを含む開発に参画',
      'AI勉強会、業務効率化支援、既存/新規プロダクトへの横展開を推進'
    ],
    technologies: ['TypeScript', 'Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'AWS', 'Playwright'],
    current: true
  },
  {
    id: 'robot-payment-backend',
    company: '株式会社ROBOT PAYMENT',
    position: '決済プロダクト バックエンドエンジニア',
    duration: '2024.08 - 2025.08',
    description: [
      'C# / .NETを中心に、決済関連API、バッチ、共通基盤、テスト、保守開発を担当',
      '口座振替、精算、明細、クレジットカード決済関連の複数機能を調査・改修',
      '既存の大規模コードベースに対して、仕様把握、影響調査、テスト観点整理を実施',
      '社内ハッカソン優勝をきっかけにAI活用と新規価値創出が評価され、CTO室へ異動'
    ],
    technologies: ['C#', '.NET', 'T-SQL', 'PowerShell', 'Batch', 'Python'],
    current: false
  },
  {
    id: 'tokai-soft-management',
    company: '東海ソフト株式会社',
    position: 'プロジェクトマネージャー / 組織マネージャー',
    duration: '2017.06 - 2024.07',
    description: [
      '組込み・製品開発系ソフトウェア組織の運営、売上・利益管理、要員計画、育成を担当',
      '課員28〜30名、パートナー20〜30名規模の組織マネジメントを経験',
      '宝くじ端末リプレースでは全体約20名規模のPMとして見積もり、チーム編成、基本設計、顧客折衝、品質管理を担当',
      '建設管理クラウド、医療機器管理、スマートデバイス、記録自動化などの新規開発を推進'
    ],
    technologies: ['C++', 'Linux', 'C#', 'Vue.js', 'Nuxt.js', 'Flutter', 'SQL Server', 'GCP'],
    current: false
  },
  {
    id: 'tokai-soft-engineer',
    company: '東海ソフト株式会社',
    position: '組込み制御 / Windows / Webアプリケーションエンジニア',
    duration: '1999.04 - 2017.05',
    description: [
      'C / C++を中心に、組込み制御、Windowsアプリケーション、通信制御、業務システムを開発',
      '詳細設計、実装、単体・結合テストから、顧客折衝、要件定義、見積もり、チーム管理まで担当範囲を拡大',
      'Linux、TCP/IP、UDP、RS232C、CANなどの制御・通信領域を経験',
      '既存システムの仕様把握、リファクタリング、品質改善を継続的に担当'
    ],
    technologies: ['C', 'C++', 'Linux', 'Windows', 'TCP/IP', 'SQL Server'],
    current: false
  }
]

export const personalInfo = {
  name: 'Naoki Kodama',
  title: 'AI推進 / Full-Stack Engineer / Playing Manager',
  location: 'Japan',
  email: '',
  github: 'https://github.com/Ardama18',
  linkedin: '',
  bio: '1999年からソフトウェア開発に携わり、組込み制御、Windowsアプリケーション、Web、モバイル、クラウド、決済システム、新規SaaS開発まで経験してきました。現在は株式会社ROBOT PAYMENTのCTO室で、AI駆動開発の全社展開、新規プロダクトへのAI導入、開発プロセス整備を推進しています。'
}

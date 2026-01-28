# SaaS営業向けGemini活用セミナーLP - TODO

## データベース・サーバーサイド
- [x] seminar_registrationsテーブルをdrizzle/schema.tsに追加
- [x] データベースマイグレーション実行（pnpm db:push）
- [x] server/seminar.ts作成（セミナー登録ヘルパー関数）
- [x] server/sendgrid.ts作成（SendGridメール送信ヘルパー）
- [x] server/routers.tsにseminar.submitRegistration APIエンドポイント追加
- [x] 管理者通知メール（HTML形式）実装
- [x] 申込者自動返信メール（HTML形式）実装

## フロントエンド
- [x] client/src/index.cssにCyan/Blueグラデーションカラースキーム設定
- [x] client/index.htmlにNoto Sans JP Googleフォント追加
- [x] client/src/pages/Home.tsxをSaaS業界向けに完全書き換え
  - [x] ヒーローセクション（SaaS営業向け）
  - [x] セミナー概要セクション
  - [x] 課題セクション（SaaS業界特有の営業課題）
  - [x] 学べることセクション（SaaS業界向けGemini活用事例）
  - [x] FAQセクション（SaaS業界関連）
  - [x] 対象者セクション（SaaS営業担当者向け）
  - [x] 参加申し込みフォーム
- [x] フォームバリデーション実装
- [x] Framer Motionアニメーション実装
- [x] レスポンシブデザイン対応
- [x] スムーススクロール実装

## テスト
- [x] server/seminar.submitRegistration.test.ts作成
- [x] フォームバリデーションテスト
- [x] メール送信テスト
- [x] データベース保存テスト

## デプロイ準備
- [ ] SendGrid環境変数設定（SENDGRID_API_KEY, SENDGRID_FROM_EMAIL）
- [ ] カスタムドメイン設定準備（gemini-salesseminar-for-saas.anyenv-inc.com）
- [x] GitHubリポジトリへのプッシュ
- [x] チェックポイント作成

## LP構成の再構築（製造業向けLPに合わせる）
- [x] セクション順序を製造業向けLPに合わせる
  - [x] ヒーローセクション
  - [x] セミナー概要セクション
  - [x] 課題セクション（4つに削減）
  - [x] 学べることセクション（4つに削減）
  - [x] FAQセクション
  - [x] なぜ"無料"で実施するのかセクション
  - [x] 参加概要セクション
  - [x] 申し込みフォームセクション
  - [x] フッター
- [x] 課題カードを6つから4つに削減
- [x] 学べることカードを6つから4つに削減
- [x] 「営業のやり方、そろそろアップデートしませんか？」CTAセクションを削除
- [x] セクションタイトルと説明文を製造業向けLPのスタイルに統一
- [x] カードデザインを製造業向けLPに合わせる
- [x] テスト実行と動作確認
- [ ] チェックポイント作成

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# アプリケーション名
## Login_Watcher

# 概要
## ユーザーのログイン管理機能
ユーザーがログインした時、リアルタイムでどのユーザーがログインしたのかが他のユーザーにも分かります。

## コメントの非同期通信
ユーザーがコメントを投稿した際に、非同期通信でコメントが表示されます。

## 既読機能
ユーザーが既読したメッセージについて、既読のカウントがつきそのメッセージが何回既読されたかが分かります。
なお、ユーザーが同じメッセージを既読しても２回目はカウントされず、最初の一回のみがカウントされます。

## コメントのいいね機能
コメントに対していいねをつけることができます。

# 制作背景
例えば、小規模のチームでプロジェクトを企画していて、メッセージを共有したい時等に、どのユーザーがログインしているのか、既読がついたのかが表示されるようになれば業務改善に繋がるのではないかと思い、開発しました。

# 工夫したポイント
## ユーザーログインについて
ユーザーのログイン機能については、Deviseをカスタマイズして実装しました。Usersテーブルにログイン状態について保持するカラムを用意し、DeviseのSession Controllerに

## 既読機能について
メッセージの既読機能は、メッセージが表示されている画面内にある場合にカウントされるようにしました。jQueryによって自動更新機能を実装し、Ajax通信によってMarksテーブルに既読情報を保存することで目的の機能を有しました。

# 使用技術について
## 開発環境
Visual Studio Code
Git GitHub
AWS
## 使用言語
Rails 5.2.4.1
ruby 2.5.1

# 課題や今後実装したい機能
より実際のチャットアプリケーションに近づけるには、グループ投稿機能が必要だと思われる。
また、課題としてSQL文の生成回数が多いことが考えられる。

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
|userimage|string|null: false|
|status|bool|null: false, default: true|
|last_login|datetime||
### Association
- has_many :messages
- has_many :marks
- has_many :favorites

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string|presence: true, unless: :image?|
|image|string||
|user_id|references|null: false, foreign_key: true|
|markcounts|integer|null: false, default: 0|
|checkmark|boolean|null: false, default: true|
|favocounts|integer|null: false, default: 0|
### Association
- belongs_to :user
- has_many :marks
- has_many :favorites

## marksテーブル
|Column|Type|Options|
|------|----|-------|
|mark|boolean|null: false, default: false|
|user_id|references|foreign_key: true, index: false|
|message_id|references|foreign_key: true, index: false|
### Association
- belongs_to :user
- belongs_to :message

## favoritesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|index: false|
|message_id|references|index: false|
|favorite|boolean|null: false, default: false|
### Association
- belongs_to :user
- belongs_to :message
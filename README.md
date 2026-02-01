# 終わってる適正検査

このプロジェクトは、終わってる適正検査のウェブアプリケーションです。

## 構成

このプロジェクトは、以下の主要なフォルダで構成されています：

- **backend/**: バックエンドのコードと設定が含まれています。
- **frontend/**: フロントエンドのコードとリソースが含まれています。
- **makeModel/**: モデルの作成や学習に関連するコードが含まれています。

## セットアップ

このプロジェクトをローカルで実行するには、以下の手順に従ってください：

1. リポジトリをクローンします。

   ```bash
   git clone <repository-url>
   cd tekisei-owatta-web
   ```

2. 必要な依存関係をインストールします。
   - バックエンド:

     ```bash
     cd backend
     npm install
     ```

   - フロントエンド:

     ```bash
     cd frontend
     npm install
     ```

   - モデル作成:

     ```bash
     cd makeModel
     npm install
     ```

3. アプリケーションを起動します。
   - バックエンド:

     ```bash
     cd backend
     npm start
     ```

   - フロントエンド:

     ```bash
     cd frontend
     npm run dev
     ```

## 使用方法

`dist`ディレクトリで、`npm run start`を実行し、アプリケーションが起動したら、ブラウザで `http://localhost:3000` にアクセスして、インターフェースを利用できます。

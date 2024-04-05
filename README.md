# NFC Voucher 🎟️

NFC Voucher est une application qui permet de créer et d'utiliser des cartes prépayées via NFC, en intégrant les technologies blockchain pour une sécurité et une transparence améliorées. 🛡️

## Fonctionnalités ✨

- **Création de Carte Prépayée**: Créez des cartes prépayées NFC pour une utilisation rapide et sécurisée.
- **Utilisation de Carte Existantes**: Intégrez des cartes NFC existantes dans le système pour réutilisation.
- **Dashboard Intuitif**: Gérez vos cartes et transactions via un dashboard convivial.
- **Wallet Paymaster**: Utilisez le Paymaster pour gérer les fonds et les transactions en toute sécurité.
- **Smart Contract**: Les smart contracts stockent les crédits liés aux cartes et s'occupent de la logistique des transactions.

## Schéma de l'architecture 🏗️

![Schéma de l'Application](https://cdn.discordapp.com/attachments/1159940054135881750/1225782719817191434/image.png?ex=6622621e&is=660fed1e&hm=5eb832879597f83ee6b0a7f84b73aa24c1a5f87228e9e8b60df73820e477cfbe&)

## Hardware ⚙️

L'application s'appuie sur un lecteur NFC qui fonctionne avec un `listener` pour détecter et lire les cartes NFC. Il informe le système lorsqu'une carte est scannée ou retirée.

## Web Application 🌐

La partie web, construite avec Next.js et Wagmi pour le Wallet Connect, permet une intégration transparente avec les wallets et les smart contracts.

### Installation et Configuration 🛠️

1. Clonez le dépôt :
   ```
   git clone https://github.com/Teyik0/nfc-voucher.git
   ```
2. Naviguez dans le dossier `front` et installez les dépendances :
   ```
   cd front
   npm install
   ```
3. Lancez l'application :
   ```
   npm run dev
   ```

## Contribution 🤝

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, n'hésitez pas à proposer des pull requests ou à ouvrir des issues.
